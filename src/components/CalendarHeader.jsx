import React, { useContext } from 'react'
import { logo_blue } from '../assets'
import GlobalContext from '../context/GlobalContext'
import dayjs from 'dayjs'

const CalendarHeader = () => {
  const {monthIndex, setMonthIndex} = useContext(GlobalContext)
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  };
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  };
  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }

  return (
    <header className='px-4 py-2 flex items-center'>
      <img src={logo_blue} alt="calendar" className='mr-2 w-24 h-24'/>
      <h1 className='mr-10 text-xl text-gray-400 font-bold'>Calendário</h1>
      <button onClick={handleReset} className="border rounded-lg py-2 px-4 mr-5">
        Hoje
      </button>
      <button onClick={handlePrevMonth}>
        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
          chevron_right
        </span>
      </button>
      <h2 className='ml-4 text-xl text-gray-500 font-bold'>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMM YYYY")}
      </h2>
    </header>
  )
}

export default CalendarHeader
