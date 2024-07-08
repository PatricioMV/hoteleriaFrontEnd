import React from 'react';
import { Room } from '../models/Models';
import moment from 'moment';

const CalendarDay: React.FC<any> = ({
  day,
  handleMouseDown,
  handleMouseUp,
}) => {
  return (
    <td key={day.date + day.room.number} colSpan={day.colspan} className={(moment().format('YYYY-MM-DD') === day.date && !day.isReserved) ? 'today-header' : 'header'} onMouseDown={() => handleMouseDown(day)} onMouseUp={() => handleMouseUp(day)}>
      {day.isReserved ? (
        <div>
          {day.reservation?.client.firstName + " " + day.reservation?.client.lastName}
        </div>
      ) : (
        <p></p>
      )}
    </td>
  );
};

export default CalendarDay;
