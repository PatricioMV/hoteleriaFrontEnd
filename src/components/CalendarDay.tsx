import React, { useEffect } from 'react';
import { Day, Room } from '../models/Interfaces';
import moment from 'moment';
import { toggleOccupationStatus } from '../services/apiUtils';

//NO TIENE PROPS

const CalendarDay: React.FC<any> = ({
  day,
  handleMouseDown,
  handleMouseUp,
  handleContextMenu,
}) => {

  useEffect(() => {
    const switchOccupationStatus = async (day: Day) => {
      if (day.date == moment().format('YYYY-MM-DD') && day.room.occupied) {
        await toggleOccupationStatus(day.room.number);
      }
    }
    switchOccupationStatus(day);
  }, [day.room.occupied]);

  const className = `${day.room.outOfOrder ? 'room-out-of-order' : (moment().format('YYYY-MM-DD') === day.date && !day.isReserved) ? 'today-calendar-day' : 'calendar-day'}${day.isReserved == true ? " " + day.reservation.state : ''}`;

  return (
    <td key={day.date + day.room.number} colSpan={day.colspan} className={className} onMouseDown={(e) => handleMouseDown(e, day)} onMouseUp={(e) => handleMouseUp(day)}>
      {day.isReserved ? (
        <div onContextMenu={(e) => handleContextMenu(e, day.room, day)} className={day.reservation.status}>
          {day.reservation?.client.firstName + " " + day.reservation?.client.lastName}
        </div>
      ) : (
        <p></p>
      )}
    </td>
  );
};

export default CalendarDay;
