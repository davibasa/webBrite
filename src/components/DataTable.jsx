import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import {
    CaretDownOutline,
    CaretUpOutline,
    ChevronBackOutline,
    ChevronForwardOutline,
    DownloadOutline,
    SearchOutline,
    CloseOutline
} from "react-ionicons";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DataTable = ({
    data,
    searchBar = false,
    excelExport = false,
    pagination = false,
    removableRows = false,
    pageSizeControl = false,
}) => {
    const columns = Object.keys(data);
    const rowCount = Math.max(
        ...columns.map((column) => data[column].values.length)
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [sortConfig, setSortConfig] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchDate, setSelectedDate] = useState(null);
    const [isDatePickerActive, setIsDatePickerActive] = useState(false);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0);
    };
    
    const handleDateChange = (date) => {
        setSelectedDate(date ? dayjs(date) : null);
        setCurrentPage(0);
    };

    const clearDateInput = () => {
        setSelectedDate(null);
        setCurrentPage(0);
    }

    const handleSort = (accessor) => {
        let direction = "asc";
        if (sortConfig && sortConfig.key === accessor) {
            if (sortConfig.direction === "asc") {
                direction = "desc";
            } else if (sortConfig.direction === "desc") {
                direction = null;
            }
        }
        setSortConfig({ key: accessor, direction });
    };

    const exportToExcel = () => {
        const exportData = rows.map((row) => {
            const exportRow = {};
            columns.forEach((column) => {
                exportRow[column] = row[column] || "False";
            });
            return exportRow;
        });
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório Brite");
        XLSX.writeFile(workbook, "data.xlsx");
    };

    const handleRowSelect = (rowIndex) => {
        const selectedRowIndex = selectedRows.indexOf(String(rowIndex));
        if (selectedRowIndex === -1) {
            setSelectedRows([...selectedRows, String(rowIndex)]);
        } else {
            const updatedSelectedRows = [...selectedRows];
            updatedSelectedRows.splice(selectedRowIndex, 1);
            setSelectedRows(updatedSelectedRows);
        }
    };

    // const handleDeleteSelectedRows = () => {
    //     const updatedData = { ...data };
    //     selectedRows.forEach((rowIndexString) => {
    //         const rowIndex = parseInt(rowIndexString, 10);
    //         columns.forEach((column) => {
    //             updatedData[column].values.splice(rowIndex, 1);
    //         });
    //     });
    //     setSelectedRows([]);
    // };

    const rows = useMemo(() => {
        return Array.from({ length: rowCount }, (_, index) => {
            return columns.reduce((acc, column) => {
                acc[column] = data[column].values[index] || "";
                return acc;
            }, {});
        });
    }, [data, columns, rowCount]);

    const sortedRows = useMemo(() => {
        if (!sortConfig || !sortConfig.direction) return rows;

        return [...rows].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [rows, sortConfig]);

    const filteredRows = useMemo(() => {
        return sortedRows.filter((row) => {
            const matchesSearchTerm = columns.some((column) =>
                String(row[column]).toLowerCase().includes(searchTerm.toLowerCase())
            );

            const matchesDate = searchDate 
                ? dayjs(row.Data, 'DD/MM/YYYY').isSame(searchDate, 'day')
                : true;
            return matchesSearchTerm && matchesDate
        }); 
    }, [sortedRows, searchTerm, columns, searchDate]);

    const paginatedRows = useMemo(() => {
        const start = currentPage * pageSize;
        return filteredRows.slice(start, start + pageSize);
    }, [filteredRows, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredRows.length / pageSize);

    return (
        <div className="max-w-full overflow-x-auto py-10 h-screen">
            <div className="flex w-full items-center justify-between mb-5">
                {searchBar ? (
                    <div className="flex md:w-[40%] w-[70%] items-center gap-3 rounded-lg px-4 py-2 bg-brite">
                        <SearchOutline style={{color: 'white'}} />
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="block form-input w-full md:px-10 rounded-md border-0 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none ring-gray-300 focus:ring-blue-900"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={searchDate}
                                onChange={handleDateChange}
                                onFocus={() => setIsDatePickerActive(true)}
                                onBlur={() => setIsDatePickerActive(false)}
                                sx={{
                                    width: '400px',           // Largura ajustada
                                    borderRadius: '6px',      // Borda arredondada
                                    background: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px', // Arredonda o campo
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',      // Remove a borda
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '10px',      // Ajusta o padding
                                        fontSize: '14px',    // Diminui o tamanho da fonte
                                    },
                                    '& .MuiOutlineInput-root.Mui-focused': {
                                        boxShadow: isDatePickerActive ? '0 0 0 2px rgba(0, 0, 255, 0.3)' : '',
                                    }
                                }}
                                format="DD/MM/YYYY"    
                            />  
                        </LocalizationProvider>
                        {(searchDate) && (
                            <CloseOutline onClick={clearDateInput} width={"26px"} height={"26px"} color={'#ffffff'} />
                            // <button
                            //     onClick={clearDateInput}
                            //     className="p-2"
                            // >
                            //     <CloseOutline width={"26px"} height={"26px"} color={'#ffffff'} />         
                            // </button>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="flex items-center gap-5">
                    {excelExport && (
                        <button
                            onClick={exportToExcel}
                            className="rounded-lg bg-brite p-2"
                        >
                            <DownloadOutline
                                width={"26px"}
                                height={"26px"}
                                cssClasses={"!text-white cursor-pointer"}
                            />
                        </button>
                    )}
                    {/* {removableRows && (
                        <button
                            onClick={handleDeleteSelectedRows}
                            disabled={selectedRows.length === 0}
                            className="rounded-lg bg-[#303030] p-2 disabled:opacity-50"
                        >
                            <TrashOutline
                                width={"26px"}
                                height={"26px"}
                                cssClasses={`${selectedRows.length === 0
                                    ? "cursor-default !text-red-300"
                                    : "cursor-pointer !text-red-400"
                                }`}
                            />
                        </button>
                    )} */}  
                </div>
            </div>
            <div className="table-container shadow-lg border-2">
                <table className="w-full overflow-x-auto max-w-[100vw]">
                    <thead>
                        <tr className="bg-brite h-[50px]">
                            <th className="hidden">Actions</th>
                            <th className="font-medium text-gray-100 text-[16px] pl-5">#</th>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    onClick={() => handleSort(column)}
                                    className="text-gray-100 text-[16px] border-r-2 border-indigo-400 px-15 cursor-pointer"
                                >
                                    <div className="flex items-center justify-center gap-[1px]">
                                        {column}
                                        {sortConfig?.key === column ? (
                                            sortConfig.direction === "asc" ? (
                                                <CaretUpOutline cssClasses={"!fill-white"} />
                                            ) : sortConfig.direction === "desc" ? (
                                                <CaretDownOutline cssClasses={"!fill-white"} />
                                            ) : (
                                                <CaretUpOutline cssClasses="hidden" />
                                            )
                                        ) : (
                                            <CaretUpOutline cssClasses="hidden" />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {paginatedRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`h-[50px] cursor-pointer ${
                                    selectedRows.includes(String(rowIndex))
                                        ? "bg-gray-300"
                                        : rowIndex % 2
                                        ? "bg-gray-100"
                                        : "bg-gray-50"
                                    }`}
                            >
                                <td className="hidden">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(String(rowIndex))}
                                        onChange={() => handleRowSelect(rowIndex)}
                                    />
                                </td>
                                <td className="pl-5">{rowIndex + 1}</td>
                                {columns.map((column, index) => {
                                    const value = row[column];
                                    const columnData = data[column];
                                    const classNames = columnData.classNames
                                        ? columnData.classNames(value)
                                        : {};
                                    const content = columnData.renderValue
                                        ? columnData.renderValue(value)
                                        : typeof value === "boolean" && columnData.renderBoolean
                                            ? columnData.renderBoolean(value)
                                            : `${value}`;

                                    return (
                                        <td
                                            key={index}
                                            className={`${classNames}`}
                                            onClick={() => handleRowSelect(rowIndex)}
                                        >
                                            <div className="flex items-center justify-center whitespace-nowrap px-5">
                                                {content ? content : columnData.renderBoolean ? columnData.renderBoolean(value) : "false"}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full mt-5 flex items-center justify-between">
                {pageSizeControl ? (
                    <div className="rounded-lg py-[2px] pr-1 bg-brite w-fit text-gray-100">
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="bg-transparent outline-none w-[80px] border-transparent pl-2 focus:border-transparent"
                        >
                            <option value={5} className="bg-brite">5</option>
                            <option value={10} className="bg-brite">10</option>
                            <option value={20} className="bg-brite">20</option>
                            <option value={50} className="bg-brite">50</option>
                        </select>
                    </div>
                ) : (
                    <div></div>
                )}
                {pagination && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="rounded-lg bg-brite p-2 disabled:opacity-50"
                        >
                            <ChevronBackOutline style={{color: 'white'}} />
                        </button>
                        <span className="text-sm">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage + 1 === totalPages}
                            className="rounded-lg bg-brite p-2 disabled:opacity-50"
                        >
                            <ChevronForwardOutline style={{color: 'white'}} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataTable;
