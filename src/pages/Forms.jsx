import React from 'react';
import DataTable from '../components/DataTable';
import { data } from '../data';

const Forms = () => {
  return (
    <div className='w-full bg-gradient-to-br h-screen from-white to-gray-200 py-10'>
        <div className='md:max-w-[1400px] m-auto max-w-[520px]'>
            <DataTable 
              data={data}
              searchBar
              excelExport
              pageSizeControl
              pagination
              removableRows
            />
        </div>
    </div>
  );
};

export default Forms
