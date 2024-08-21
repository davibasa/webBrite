import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

const ContextWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(null);
    useEffect(() => {
      if (smallCalendarMonth != null) {
        setMonthIndex(smallCalendarMonth)
      }
    }, [smallCalendarMonth])
  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex, setSmallCalendarMonth, smallCalendarMonth, daySelected, setDaySelected }}>
        {props.children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper
