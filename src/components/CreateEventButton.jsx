import React from 'react'
import { plusIcon } from '../assets'

const CreateEventButton = () => {
  return <button className='border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl'>
        <img src={plusIcon} alt="create_event" className='w-7 h-7' />
        <span className='pl-3 pr-7 font-semibold text-gray-500'>Create</span>
    </button>
  
}

export default CreateEventButton
