import React from 'react';
import { Room } from '../models/Models';

const CalendarCell: React.FC<any> = ({
  day,
  index,
  room,
  handleMouseDown,
  handleMouseUp,
  checkInDate,
  checkOutDate,
  isDragging,
}) => {
  return (
    <td
      key={index}
      onMouseDown={() => handleMouseDown(room, day.date)}
      onMouseUp={() => handleMouseUp(room, day.date)}
      style={{
        backgroundColor:
          isDragging && day.date >= checkInDate && day.date <= checkOutDate
            ? 'lightblue'
            : day.reserved
            ? 'red'
            : 'white',
      }}
    >
      {day.reserved ? day.client : ''}
    </td>
  );
};

export default CalendarCell;
