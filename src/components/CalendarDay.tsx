import React from 'react';
import { CalendarDayProps, Day } from '../models/Interfaces';
import moment from 'moment';

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  handleMouseDown,
  handleMouseUp,
  handleContextMenu,
}) => {

  const getClassName = (day: Day) => {
    let className = '';

    if (!day.room.outOfOrder) {
      if (moment().format('YYYY-MM-DD') === day.date && !day.isReserved) {
        className = 'today-calendar-day';
      } else {
        className = 'calendar-day';
      }
    }

    if (day.isReserved) {
      className += ` ${day.reservation!.status}`;
      if (day.reservation!.debt > 0 && day.reservation?.status != "No-show") {
        className += ' debtor';
      }
    }

    return className;
  };

  const className = getClassName(day);

  return (
    <td key={day.date + day.room.number} colSpan={day.colspan} className={className} onMouseDown={(e) => handleMouseDown(e, day)} onMouseUp={(e) => handleMouseUp(day)}>
      {day.isReserved ? (
        <div onContextMenu={(e) => handleContextMenu(e, day.room, day)}>
          {day.reservation?.client.firstName + " " + day.reservation?.client.lastName}
        </div>
      ) : (
        <p></p>
      )}
    </td>
  );
};

export default CalendarDay;
