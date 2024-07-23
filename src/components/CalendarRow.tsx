import React from 'react';
import { CalendarRowProps } from '../models/Interfaces';
import ReservationModal from './ReservationModal';
import useReservationModal from '../hooks/useReservationModal';
import CalendarDay from './CalendarDay';
import useContextMenu from '../hooks/useContextMenu';
import ContextMenu from './ContextMenu';
import useCalendarRow from '../hooks/useCalendarRow';

const CalendarRow: React.FC<CalendarRowProps> = ({ room, startDate, endDate, forceCalendarRender }) => {
  const { days, handleNewReservation } = useCalendarRow(room, startDate, endDate);
  const { handleMouseDown, handleMouseUp, reservationModalIsOpen, closeReservationModal, reservation, handleChange, handleSubmit, alert, resetAlert } = useReservationModal(handleNewReservation);
  const { menuRef, isVisible, menuPosition, handleContextMenu, closeContextMenu, options } = useContextMenu(forceCalendarRender);
  return (
    <>
      <tr key={room.number} className={room.outOfOrder ? "room-out-of-order" : "room"} >
        <td className={room.outOfOrder ? "room-info-out-of-order" : "room-info"} onContextMenu={(e) => handleContextMenu(e, room)}>{room.number} {room.type}</td>
        {days.map((day) => <CalendarDay key={day.date} day={day} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleContextMenu={handleContextMenu} />)}
      </tr>
      <ReservationModal modalIsOpen={reservationModalIsOpen} closeModal={closeReservationModal} reservation={reservation} handleChange={handleChange} handleSubmit={handleSubmit} alert={alert} resetAlert={resetAlert} />
      <ContextMenu menuRef={menuRef} x={menuPosition.x} y={menuPosition.y} show={isVisible} closeContextMenu={closeContextMenu} options={options} />
    </>
  );
};

export default CalendarRow;