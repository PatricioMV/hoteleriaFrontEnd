import React, { useEffect } from 'react';
import { Day, Room } from '../models/Interfaces';
import moment from 'moment';
import { toggleOccupationStatus } from '../services/apiUtils';

const CalendarDay: React.FC<any> = ({
  day,
  handleMouseDown,
  handleMouseUp,
}) => {

  useEffect(() => {
    const switchOccupationStatus = async (day: Day) => {
      if (day.date == moment().format('YYYY-MM-DD') && day.room.occupied) {
        await toggleOccupationStatus(day.room.number);
      }
    }
    switchOccupationStatus(day);
  }, [day.room.occupied]);

  console.log(day.room.outOfOrder)

  const className = day.room.outOfOrder ? 'room-out-of-order' : (moment().format('YYYY-MM-DD') === day.date && !day.isReserved) ? 'today-header' : 'header';

  return (
    <td key={day.date + day.room.number} colSpan={day.colspan} className={className} onMouseDown={(e) => handleMouseDown(e, day)} onMouseUp={(e) => handleMouseUp(e, day)}>
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
