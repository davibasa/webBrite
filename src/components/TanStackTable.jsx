import React, { useEffect, useState } from "react";
import genericService from "../services/genericService";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "./DebouncedInput";
import { IoIosSearch } from "react-icons/io";
import { TbArrowsSort, TbMessageCirclePlus } from "react-icons/tb";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { GiPlainCircle } from "react-icons/gi";
import { add, format, isToday, isYesterday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const TanStackTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const columns = [
    // columnHelper.accessor("", {
    //   id: "S.No",
    //   cell: (info) => <span>{info.row.index + 1}</span>,
    //   header: "#",
    // }),

    columnHelper.accessor("isRecentMsg", {
      cell: (info) => (
        <div className="flex justify-center h-full pl-6">
          {/* Verifica se a mensagem é recente e aplica a cor correta ao ícone */}
          <TbMessageCirclePlus
            className={
              info.row.original.isRecentMsg
                ? "text-brite text-xl animate-custom-ping"
                : "text-black"
            }
          />
        </div>
      ),
      header: () => (
        <div className="flex items-center gap-2">
          <span>Novos</span>
          <FiPlusCircle className="text-white text-xl" />
        </div>
      ),
      enableSorting: false,
    }),

    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Nome",
    }),
    columnHelper.accessor("ddd", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "DDD",
    }),
    columnHelper.accessor("number", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Número",
    }),
    columnHelper.accessor("lastMsgFormatted", {
      cell: (info) => (
        <span className={info.row.original.isRecentMsg ? "text-blue-900" : ""}>
          {info.getValue()}
        </span>
      ),
      header: "Última Mensagem",
      sortingFn: (rowA, rowB) => {
        const dateA = rowA.original.lastMsg;
        const dateB = rowB.original.lastMsg;
        return dateB - dateA;
      },
    }),
    columnHelper.accessor("callAttendant", {
      cell: (info) => (
        <div className="flex items-center justify-center h-full">
          {info.getValue()}
        </div>
      ),
      header: "Chamou Atendente",
      enableSorting: false,
    }),
  ];

  //   const [data] = useState(() => [...dataApi]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    initialState: {
      sorting: [{ id: "lastMsgFormatted", cresc: true }],
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await genericService.getRequest(
          "/PersonPhones/GetContactsMessage",
          {},
          {}
        );
        const fetchedData = response.data;
        const formattedData = fetchedData.map((item) => {
          let lastMsgDate = parseISO(item.date_Last_Msg);
          lastMsgDate = add(lastMsgDate, { hours: -3 });
          const isRecentMsg = isToday(lastMsgDate) || isYesterday(lastMsgDate);

          return {
            name: item.contact,
            ddd: item.ddd,
            number: item.phone,
            lastMsg: lastMsgDate,
            lastMsgFormatted: format(lastMsgDate, "dd/MM/yy - HH:mm", {
              locale: ptBR,
            }),
            callAttendant: item.call_Attendant ? (
              <GiPlainCircle className="text-green-500" />
            ) : (
              <GiPlainCircle className="text-red-500" />
            ),
            isRecentMsg,
          };
        });

        setData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 h-screen">
        <div className="h-52 w-52 border-8 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-brite animate-spin ease-linear rounded-full"></div>
      </div>
    );
  }
  if (error) return <div>Erro ao carregar dados: {error}</div>;

  return (
    <div className="py-4 max-w-6xl mx-auto fill-gray-400">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center w-full gap-1">
          <IoIosSearch className="text-gray-400" />

          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent form-input border-t-0 border-r-0 border-l-0 outline-none placeholder:text-gray-400 border-b-2 w-1/5 focus:w-1/3 focus:ring-0 duration-300 border-brite"
            placeholder="Pesquisar"
          />
        </div>

        <DownloadBtn data={data} fileName={"Relatório Brite"} />
      </div>

      <div className="py-4 overflow-x-scroll">
        <table className="border shadow-lg w-full text-center justify-center">
          <thead className="bg-brite text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="font-semibold py-3 pl-6">
                    <div className="flex items-center justify-center gap-2 h-full">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <TbArrowsSort
                          className="text-gray-300 active:text-gray-400 hover:text-white"
                          onClick={header.column.getToggleSortingHandler()}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                    ${i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-3.5 py-2.5 items-center justify-center ${
                        row.original.isRecentMsg
                          ? "text-gray-900 font-bold"
                          : "text-gray-600 font-medium"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                 <td colSpan={12}>Nenhum resultado encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center mt-2 justify-between">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="bg-transparent border-2 text-gray-500 border-brite active:text-gray-400 rounded-lg outline-none w-[80px] focus:border-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="rounded-2xl bg-brite p-2 disabled:opacity-50"
          >
            <MdNavigateBefore className="text-white" size={20} />
          </button>
          <span className="flex items-center gap-1">
            <div>Página</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {""}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="rounded-2xl bg-brite p-2 disabled:opacity-50"
          >
            <MdNavigateNext className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TanStackTable;
