import React, { useEffect } from 'react';
import { Day, Room } from '../models/Models';
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
