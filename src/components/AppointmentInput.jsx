import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import genericService from "../services/genericService";

export const scheduleAppointment = async (appointmentData) => {
  const endpoint = '/appointments'; // Defina o endpoint correto de acordo com sua API
  try {
    // Preparando o payload de dados no formato esperado pela API
    const data = {
      Dentist_Id: appointmentData.dentistId,
      Patient_Id: appointmentData.patientId,
      Date: appointmentData.date, // Data em formato ISO, exemplo: '2024-09-10'
      Hour: appointmentData.hour, // Hora em formato 'HH:mm:ss'
      Duration: appointmentData.duration, // Duração em formato 'HH:mm:ss'
      Description: appointmentData.description,
    };

    // Chamando o serviço POST com o endpoint e os dados
    const response = await genericService.postRequest(endpoint, data);

    // Retorna a resposta da API, ou trata conforme necessário
    return response;
  } catch (error) {
    console.error('Erro ao agendar compromisso:', error.message);
    throw error;
  }
};

export const savePerson = async (personData) => {
  const endpoint = '/People'; // Defina o endpoint correto da sua API
  try {
    // Faz a chamada POST para salvar a pessoa
    const response = await genericService.postRequest(endpoint, personData);

    // Retorna a resposta da API
    return response;
  } catch (error) {
    console.error('Erro ao salvar pessoa:', error.message);
    throw error;
  }
};

// Função para verificar se a pessoa existe com base no número de telefone
const checkPersonExists = async (phoneNumber) => {
  const endpoint = `/PersonPhones/VerifyNumberExist`;
  var response;
  try {
     response = await genericService.getRequest(endpoint, {}, {
      phone: phoneNumber});
      console.log(response)
    return response; // Supondo que a API retorne uma lista de pessoas
  } catch (error) {
    console.error('Erro ao verificar se a pessoa existe:', response.message);
    throw error;
  }
};

const AppointmentInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();


  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    let formattedNumber;

    if (input.length > 10) {
      // Formato para (99) 99999-9999
      formattedNumber = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
    } else if (input.length > 6) {
      // Formato para (99) 9999-9999
      formattedNumber = `(${input.slice(0, 2)}) ${input.slice(2, 6)}-${input.slice(6, 10)}`;
    } else if (input.length > 2) {
      // Formato parcial para (99) 9999
      formattedNumber = `(${input.slice(0, 2)}) ${input.slice(2)}`;
    } else {
      // Apenas o DDD
      formattedNumber = input;
    }

    setNumber(formattedNumber);
    console.log(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setPopupMessage(null);
  
    try {
      // Verifica se todos os campos obrigatórios estão preenchidos
      if (!name || !email || !number) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }
      console.log(name, email, number)
      // Formata o número de telefone para enviar apenas os dígitos
      const formattedNumber = '55' + number.replace(/\D/g, '');
  
      // Verifica se o número da pessoa já existe no banco de dados
      const personExists = await checkPersonExists(formattedNumber);
      console.log(personExists)
  
      let personId;
      if (personExists.data.pessoa_existe === 1) {
        // Se a pessoa não existir, salve a pessoa no banco de dados
        const personData = {
          Type_Person: 'F', 
          Created_At: new Date().toISOString(),
          Updated_At: new Date().toISOString(),
          Active: true,
          PersonInfos: {
            Name: name,
          },
          PersonPhones: [
            {
              Type_Phone: 'Mobile',
              Contact: name,
              DDD: parseInt(formattedNumber.slice(0, 2), 10), // Extrai DDD dos primeiros 2 dígitos
              Phone: formattedNumber,
              Date_Last_Msg: new Date().toISOString(),
              Call_Attendant: false,
            },
          ],
        };
        console.log('PersonData:', personData);
        const savedPerson = await savePerson(personData);
        personId = savedPerson.id; // Supondo que a API retorne o ID da pessoa criada
      } else {
        // Se a pessoa já existir, utilize o ID retornado
        personId = personExists.data.id_pessoa;
      }
  
      console.log(personId);
      // Dados para o agendamento
      const appointmentData = {
        dentistId: 1, // Ajuste conforme necessário
        patientId: personId, // Usa o ID da pessoa existente ou recém-criada
        date: '2024-09-10', // Você pode substituir isso por um valor dinâmico
        hour: '10:00:00', // Idem
        duration: '00:30:00', // Idem, ajustar conforme necessário
        description: popupMessage, // Você pode substituir por um campo dinâmico de formulário
      };
  
      // Faz a chamada ao serviço de agendamento
      const result = await scheduleAppointment(appointmentData);
  
      // Sucesso ao agendar o compromisso
      console.log('Compromisso agendado com sucesso:', result);
  
      // Redirecionar ou atualizar o estado conforme necessário após sucesso
      // navigate('/home'); //ou qualquer outra ação
  
    } catch (error) {
      // Verifica se é um erro de rede
      if (error.name === 'TypeError') {
        setPopupMessage(
          'Erro de conexão. Verifique sua internet e tente novamente.'
        );
      } else {
        // Exibe mensagens de erro mais detalhadas
        setPopupMessage(
          error.message || 'Erro inesperado. Por favor, tente novamente.'
        );
      }
    } finally {
      // Garante que o estado de loading seja atualizado, mesmo em caso de erro
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="md:grid md:grid-cols-6 gap-4">
          <div className="md:col-span-3 col-span-full">
            <label htmlFor="name" className="block font-bold">
              Nome
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="md:col-span-3 col-span-full py-4 md:py-0">
            <label htmlFor="email" className="block font-bold">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="md:col-span-3 col-span-full">
            <label htmlFor="phone" className="block font-bold">
              Número
            </label>
            <div className="mt-2">
              <input
                id="number"
                name="number"
                type="text"
                required
                value={number}
                onChange={handlePhoneChange}
                autoComplete="current-number"
                className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
          </div>

          <div className="md:col-span-6 col-span-full py-4 md:py-0">
            <p className="font-bold">
              Compartilhe qualquer coisa que possa <br /> ser útil para melhor
              experiência da consulta
            </p>
            <div className="mt-2 px-4 mb-4 rounded-md rounded-t-md border-2 border-gray-200">
              <textarea
                id="comment"
                rows="3"
                className="px-0 resize-y w-full text-sm text-gray-900 border-0 caret-indigo-600 focus:ring-0 focus:outline-none"
                placeholder="Anote aqui..."
              ></textarea>
            </div>
          </div>
        </div>

        {popupMessage && (
          <div className="text-red-500 text-sm text-center">{popupMessage}</div>
        )}
      </form>
      <div className="flex items-center gap-4 justify-center">
        <button
          type="submit"
          className="border px-8 md:px-20 py-2 bg-brite animated-background hover:bg-gradient-to-r hover:from-[#6363EF] hover:via-indigo-400 hover:to-indigo-600 focus:outline-none
            text-white shadow-lg rounded-2xl  text-sm md:text-base hover:border-transparent font-semibold active:text-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex justify-center rounded-2xl border-2 border-brite-hover px-4 md:px-10 py-1.5 text-sm font-semibold leading-6 shadow-md bg-brite text-white focus-visible:outline"
          onSubmit={handleSubmit}
          onClick={handleSubmit}
        >
          Agendar
        </button>
      </div>
    </div>
  );
};

export default AppointmentInput;
