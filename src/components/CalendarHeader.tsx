import moment from 'moment';
import React from 'react';
import { generateHeadersDays, getYesterday } from '../utils/dateUtils';

interface CalendarHeadersProps {
  numDays: number;
}

export interface CalendarHeaderDays {
  date: string;
  class: string;
}


const CalendarHeaders: React.FC<CalendarHeadersProps> = ({ numDays }) => {
  const headersDays = generateHeadersDays(numDays);
  return (
    <tr>
      <th>Room:</th>
      {headersDays.map((day) => <th key={day.date} className={day.class}>{day.date}</th>)}
    </tr>);
};

export default CalendarHeaders;
