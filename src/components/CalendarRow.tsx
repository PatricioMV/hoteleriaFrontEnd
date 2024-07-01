import React, { useState, useEffect } from 'react';
import { Reservation, Day, Room, CalendarRowProps } from '../models/Models';
import { loadReservationsBetweenDatesById } from '../services/apiUtils';
import moment from 'moment';
import { Button, Form, Modal } from 'react-bootstrap';
import NewReservationModal from './NewReservationModal';
import useNewReservationModal from '../hooks/useNewReservationModal';

const CalendarRow: React.FC<CalendarRowProps> = ({ room, startDate, endDate }) => {
  const [days, setDays] = useState<Day[]>([]);
  const { handleMouseDown, handleMouseUp, modalIsOpen, closeModal, checkIn, checkOut } = useNewReservationModal();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await loadReservationsBetweenDatesById(
          startDate.format('YYYY-MM-DD'),
          endDate.format('YYYY-MM-DD'),
          room.id
        );
        if (reservations) {
          setDays(generateDays(startDate, endDate, reservations));
        }
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    };

    fetchReservations();
  }, [room.id, startDate, endDate]);

  const generateDays = (
    startDate: moment.Moment,
    endDate: moment.Moment,
    reservations: Reservation[]
  ): Day[] => {
    const days: Day[] = [];
    let date = startDate.clone();

    while (date.isBefore(endDate)) {
      const formattedDate = date.format('DD/MM/YYYY');
      const reservation = reservations.find((r) => r.checkIn === formattedDate);
      if (reservation) {
        days.push({
          date: date.format('YYYY-MM-DD'),
          room: room,
          isReserved: true,
          reservation: reservation,
          colspan: reservation.nightsStayed,
        });
        date.add(reservation.nightsStayed, 'days');
      } else {
        days.push({
          date: date.format('YYYY-MM-DD'),
          room: room,
          isReserved: false,
          colspan: 1,
        });
        date.add(1, 'days');
      }
    }
    return days;
  };

  return (
    <>
      <tr key={room.number}>
        <td >{room.number} {room.type}</td>
        {days.map((day) => (
          <td key={day.date + room.number} colSpan={day.colspan} className="calendar-cell" onMouseDown={() => handleMouseDown(day)} onMouseUp={()=> handleMouseUp(day)}>
            {day.isReserved ? (
              <div>
                  {day.reservation?.client.firstName}{' '}{day.reservation?.client.lastName}
                {/* Aquí puedes mostrar más detalles de la reserva si es necesario */}
              </div>
            ) : (
              <p></p> // Renderizar un espacio en blanco para días sin reserva
            )}
          </td>
        ))}
      </tr>

      <NewReservationModal modalIsOpen={modalIsOpen} closeModal={closeModal} checkIn={checkIn} checkOut={checkOut}/>   

      </>
  );
};

export default CalendarRow;
