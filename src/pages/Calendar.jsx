import React, { useState, useContext, useEffect } from 'react'
import { getMonth } from "../utils"
import { SideBar, Month, CalendarHeader } from '../components'
import GlobalContext from '../context/GlobalContext'

const Calendar = () => {
    console.table(getMonth())
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const { monthIndex } = useContext(GlobalContext)
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])

  return (
    <React.Fragment>
        <div className='h-screen px-20 flex flex-col pb-8'>
            <CalendarHeader />
            <div className='flex flex-1'>
                <SideBar />
                <Month month={currentMonth} />
            </div>
        </div>
    </React.Fragment>
  )
}

export default Calendar
