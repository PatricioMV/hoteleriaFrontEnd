import React from 'react';
import { generateHeadersDays } from '../utils/dateUtils';
import { CalendarHeaderDays, CalendarHeadersProps } from '../models/Interfaces';

const CalendarHeaders: React.FC<CalendarHeadersProps> = ({ numDays }) => {
  const headersDays: CalendarHeaderDays[] = generateHeadersDays(numDays);
  return (
    <tr>
      <th>Room:</th>
      {headersDays.map((day) => <th key={day.date} className={day.class}>{day.date}</th>)}
    </tr>);
};

export default CalendarHeaders;
