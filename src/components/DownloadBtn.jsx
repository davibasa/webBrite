import React from 'react';
import { MdDownloadForOffline } from "react-icons/md";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <div>
        <button 
            className='flex items-center gap-1.5 border bg-brite animated-background hover:bg-gradient-to-r hover:from-[#6363EF] hover:via-indigo-400 hover:to-indigo-600 focus:outline-none
            text-white shadow-xl rounded-lg md:px-6 py-2 text-sm md:text-base hover:border-transparent active:text-gray-300 font-semibold'
            onClick={() => {
                const datas = data?.length ? data : [];
                const worksheet = XLSX.utils.json_to_sheet(datas);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
            }}
        >
            <MdDownloadForOffline size={20} />
            Download 
        </button>
    </div>
  )
}

export default DownloadBtn
