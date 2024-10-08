import React, { Fragment, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format as formatTz } from 'date-fns-tz'; 
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfMonth,
  startOfToday,
  setHours,
  isBefore,
} from "date-fns";

import { ptBR } from "date-fns/locale";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { FaRegClock } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import genericService from "../services/genericService";
import AppointmentInput from "../components/AppointmentInput";
import Global from "../utils/Global";
const timeZone = 'America/Sao_Paulo'; // Fuso horário de Brasília (UTC-3)

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-21T13:00",
    endDatetime: "2024-09-21T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-20T09:00",
    endDatetime: "2024-09-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-20T17:00",
    endDatetime: "2024-09-20T18:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-09T13:00",
    endDatetime: "2024-09-09T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-13T14:00",
    endDatetime: "2024-09-13T14:30",
  },
];

const adjustToBrasiliaTime = (dateString) => {
  const date = new Date(dateString); // Converte o string ISO para objeto Date
  const offset = +3; // UTC-3 (Brasília)
  date.setHours(date.getHours() + offset); // Ajusta o horário manualmente para UTC-3
  return date;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

async function CompanyExists(empresa) {
  try {
    // Realiza a requisição para verificar se a empresa existe
    const response = await genericService.getRequest(
      "/AnyCompany",
      {},
      {column: "url_calendar", value: empresa},
      Global.MinApi
    );

    // Extrai os dados da resposta
    const fetchedData = response.data;

    // Verifica se os dados foram obtidos com sucesso
    if (!fetchedData || fetchedData.length === 0) {
      throw new Error("Nenhuma empresa encontrada.");
    }

    return fetchedData;

  } catch (err) {
    // Verifica se o erro é de conexão ou relacionado à API
    if (err.response) {
      // Erros com a resposta do servidor (ex.: 404, 500)
      console.error(`Erro na API: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      console.error("Nenhuma resposta do servidor. Verifique a conexão ou a URL.");
    } else {
      // Erros na configuração da requisição ou na lógica
      console.error(`Erro: ${err.message}`);
    }

    // Lançar o erro para ser tratado em outro local, se necessário
    throw err;
  }
}


async function DentistAvailability(empresa, dentist) {
  try {
    console.log(empresa);
    // Realiza a requisição para verificar se a empresa existe
    const response = await genericService.getRequest(
      "/Appointments/dentistAvailability",
      {},
      {dentistUrl: dentist, tenant: empresa},
    );

    // Extrai os dados da resposta
    const fetchedData = response.data;

    // Verifica se os dados foram obtidos com sucesso
    if (!fetchedData || fetchedData.length === 0) {
      throw new Error("Nenhuma empresa encontrada.");
    }

    return fetchedData;

  } catch (err) {
    // Verifica se o erro é de conexão ou relacionado à API
    if (err.response) {
      // Erros com a resposta do servidor (ex.: 404, 500)
      console.error(`Erro na API: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      console.error("Nenhuma resposta do servidor. Verifique a conexão ou a URL.");
    } else {
      // Erros na configuração da requisição ou na lógica
      console.error(`Erro: ${err.message}`);
    }

    // Lançar o erro para ser tratado em outro local, se necessário
    throw err;
  }
}

async function fetchAvailableTimes(dentist, selectedDay) {
  try {
    const formattedDate = format(selectedDay, "yyyy-MM-dd'T'00:00:00'Z'"); // Formata a data com hora fixa
    const response = await genericService.getRequest(
      `/Appointments/availableTimes`,
      {},
      {dentistaUrl: dentist, dateHour: formattedDate } // Envia a data formatada
    );

    const fetchedData = response.data;
    console.log(fetchedData);
    if (!fetchedData || fetchedData.length === 0) {
      throw new Error("Nenhum horário disponível para este dia.");
    }

    return fetchedData;
  } catch (err) {
    // Verifica se o erro é de conexão ou relacionado à API
    if (err.response) {
      // Erros com a resposta do servidor (ex.: 404, 500)
      console.error(`Erro na API: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      console.error("Nenhuma resposta do servidor. Verifique a conexão ou a URL.");
    } else {
      // Erros na configuração da requisição ou na lógica
      console.error(`Erro: ${err.message}`);
    }

    // Lançar o erro para ser tratado em outro local, se necessário
    throw err;
  }
}

const Calendly = () => {
  const { empresa: empresaParams } = useParams();
  const { dentista: dentistaParams } = useParams();
  const [companyExist, setCompanyExist] = useState(null); // To manage company existence status
  const [workDays, setWorkDays] = useState(null); // To manage company existence status
  const [availableTimes, setAvailableTimes] = useState([]);
  const [error, setError] = useState(null); // To handle errors
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [showTimes, setShowTimes] = useState(false);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  // const [duration, setDuration] = useState(60);

  // Definição dos métodos fornecidos:

  const checkCompanyExistence = async () => {
    try {
      console.log("Verificando existência da empresa...");
      const company = await CompanyExists(empresaParams);
      setCompanyExist(company);  // Atualiza o estado de existência da empresa
      return company;  // Retorna a empresa para uso posterior
    } catch (err) {
      console.error("Erro ao verificar a empresa:", err.message);
      setError(err.message);
      return null;  // Retorna null em caso de erro
    }
  };

  const checkDentistAvailability = async (bash) => {
    try {
      console.log("Verificando disponibilidade do dentista...");
      const days = await DentistAvailability(bash, dentistaParams);
      setWorkDays(days);  // Atualiza os dias disponíveis do dentista
    } catch (err) {
      console.error("Erro ao verificar a disponibilidade do dentista:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const checkData = async () => {
      try {
        // Primeiro, verifica se a empresa existe
        const company = await checkCompanyExistence();

        // Se a empresa existir, verifica a disponibilidade do dentista
        if (company) {
          await checkDentistAvailability(company.bash); // Passa os dados da empresa para a segunda função
        }
      } catch (error) {
        console.error('Erro ao checar os dados:', error.message);
        setError(error.message);
      }
    };

    checkData(); // Chama a função para iniciar o processo
  }, []); // Remove a dependência de companyExist para evitar loop


  useEffect(() => {
    const loadAvailableTimes = async () => {
      if (selectedDay) {
        try {
          const times = await fetchAvailableTimes(dentistaParams, selectedDay); // Busca os horários da API
          setAvailableTimes(times); // Garante que seja sempre um array
        } catch (error) {
          console.error("Erro ao carregar os horários disponíveis:", error);
          setAvailableTimes([]); // Garante que seja um array vazio em caso de erro
        }
      }
    };
  
    loadAvailableTimes();
  }, [dentistaParams, selectedDay]);
  
  console.log(workDays);


  let newDays = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const isCurrentMonth = isSameMonth(firstDayCurrentMonth, today);

  // let selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // );

  function handleDateClick(day) {
    if (!isBefore(day, today)) {
      setSelectedDay(day);
      setShowTimes(true);
    }
  }

  const getDayNameFromIndex = (dayIdx) => {
    switch (dayIdx) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda-feira";
      case 2:
        return "Terça-feira";
      case 3:
        return "Quarta-feira";
      case 4:
        return "Quinta-feira";
      case 5:
        return "Sexta-feira";
      case 6:
        return "Sábado";
      default:
        return "";
    }
  };
  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-200 py-14 px-6 flex items-center md:h-screen justify-center">
      <div
        className={`${
          showTimes ? "md:grid-cols-3" : "md:grid-cols-2"
        } md:max-w-[1400px] m-auto max-w-[520px] grid justify-center items-center md:border border-gray-100 md:px-16 md:py-10 rounded-xl md:shadow-2xl gap-10`}
      >
        <div className="md:pr-10 pb-8 md:pb-0 flex flex-col justify-center items-center border-b-2 md:border-b-0 md:border-r-2 h-full">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            className="flex-none w-16 h-16 rounded-full"
          />
          <p className="text-gray-400 font-semibold pt-2">{empresaParams.charAt(0).toUpperCase() + empresaParams.slice(1).toLowerCase()}</p>
          <h1 className="font-semibold py-2 text-2xl">Consulta {dentistaParams.charAt(0).toUpperCase() + dentistaParams.slice(1).toLowerCase()}</h1>
          <p>{}</p>
        </div>

        <div className="md:pl-10 md:w-96 w-80 pt-8 md:pt-0">
          <h2 className="font-bold text-xl pb-12">
            Selecione a Data e Horário
          </h2>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={previousMonth}
              disabled={isCurrentMonth}
              className={classNames(
                "flex items-center p-2 rounded-full",
                isCurrentMonth
                  ? "text-gray-400 cursor-not-allowed bg-gray-200"
                  : "text-brite hover:bg-blue-100 bg-sky-100 hover:text-brite-hover active:text-brite-active active:bg-blue-200"
              )}
            >
              <span className="sr-only">Previus Month</span>
              <FaChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <h3 className="flex font-semibold text-gray-900 capitalize">
              {format(firstDayCurrentMonth, "MMMM yyyy", { locale: ptBR })}
            </h3>
            <button
              type="button"
              onClick={nextMonth}
              className="flex items-center p-2 bg-sky-100 rounded-full text-brite hover:bg-blue-100 hover:text-brite-hover active:text-brite-active active:bg-blue-200"
            >
              <span className="sr-only">Next Month</span>
              <FaChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
            <div>D</div>
            <div>S</div>
            <div>T</div>
            <div>Q</div>
            <div>Q</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 mt-2">
            {newDays.map((day, dayIdx) => {
              const isPastDay = isBefore(day, today);
              const dayName = getDayNameFromIndex(getDay(day));
              const isDayEnabled = workDays?.[dayName];
              return (
                <div
                  key={day.toString()}
                  className={classNames(
                    // dayIdx > 6 && 'border-t border-gray-200',
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1"
                  )}
                >
                   <button
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isPastDay || !isDayEnabled}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-indigo-600",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, today) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-indigo-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-brite-active",
                      isPastDay
                        ? "text-slate-300"
                        : "hover:bg-blue-200 hover:text-white active:bg-brite-active",
                      !isDayEnabled && "text-slate-300 cursor-not-allowed",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                  <div className="w-1 h-1 mx-auto mt-1">
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <section className="pb-20">
            <h2 className="font-semibold text-gray-900">
              Agendar para{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No meetings for Today</p>
              )}
            </ol>
          </section> */}

          {showTimes && (
              <div>
                <section className="overflow-y-scroll h-[430px] px-4 md:flex md:flex-col mt-8 md:mt-0 md:pl-16">
                  <h2 className="font-semibold md:text-lg 2xl:text-xl pb-4 text-gray-900 capitalize">
                    {format(selectedDay, "EEEE, MMMM d", { locale: ptBR })}
                  </h2>
                  <div className="space-y-4">
                    {availableTimes.length > 0 ? (
                      availableTimes.map((time, idx) => {
                        const adjustedDate = adjustToBrasiliaTime(time); // Ajusta o horário para Brasília
                        const formattedTime = format(adjustedDate, 'HH:mm'); // Formata o horário para exibição

                        return (
                          <div key={idx}>
                            <button
                              className="w-full py-2 font-semibold animated-background hover:bg-gradient-to-r hover:from-brite
                                hover:via-indigo-400 hover:to-indigo-600 text-brite border-2 border-brite rounded-md text-base
                                hover:text-white focus:outline-none hover:border-transparent active:bg-indigo-950 active:text-gray-300"
                              onClick={() => setOpen(true)}
                            >
                              {formattedTime} {/* Exibe o horário ajustado */}
                            </button>

                            {open && (
                              <Modal open={open} onClose={() => setOpen(false)}>
                                <div className="flex flex-col md:w-[650px] divide-y-2">
                                  <h1 className="text-2xl font-semibold pb-4">Confirmar agendamento:</h1>
                                  <h2 className="text-lg font-bold py-4 flex items-center gap-2">
                                    <FaRegClock /> 60 minutos{" "}
                                    <span className="text-gray-400 font-semibold">com</span> Dr Marcelo
                                  </h2>
                                  <p className="capitalize py-2 flex items-center gap-2">
                                    <IoCalendarClear className="text-gray-500" />{" "}
                                    {format(selectedDay, "EEEE, MMMM d", { locale: ptBR })}
                                  </p>

                                  <AppointmentInput />
                                </div>
                              </Modal>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p>Sem horários disponíveis</p>
                    )}
                  </div>
                </section>
              </div>
            )}

      </div>
    </div>
  );
};
function Meeting({ meeting }) {
  let startDatetime = parseISO(meeting.startDatetime);
  let endDatetime = parseISO(meeting.endDatetime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDatetime, "h:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={meeting.endDatetime}>
            {format(endDatetime, "h:mm a")}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <MenuButton className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <HiDotsVertical className="w-6 h-6" aria-hidden="true" />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                {({ focus }) => (
                  <a
                    href="#"
                    className={classNames(
                      focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <a
                    href="#"
                    className={classNames(
                      focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Cancel
                  </a>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </li>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default Calendly;
