import React from 'react'
import { TanStackTable } from '../components'

const Table = () => {
  return (
    <div className='pt-4 min-h-screen w-full bg-gradient-to-br from-white to-gray-200'>
        <div className='md:max-w-[1400px] m-auto max-w-[520px] px-8'>
            <TanStackTable />
        </div>
    </div>
  )
}

export default Table
