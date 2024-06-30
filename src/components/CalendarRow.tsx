import React, { useState, useEffect } from 'react';
import { Reservation, Day, Room } from '../models/Models';
import { loadReservationsBetweenDatesById } from '../services/apiUtils';
import moment from 'moment';

interface CalendarRowProps {
  room: Room;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const CalendarRow: React.FC<CalendarRowProps> = ({ room, startDate, endDate }) => {
  const [days, setDays] = useState<Day[]>([]);

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
          date: formattedDate,
          isReserved: true,
          reservation: reservation,
          colspan: reservation.nightsStayed,
        });
        date.add(reservation.nightsStayed, 'days');
      } else {
        days.push({
          date: formattedDate,
          isReserved: false,
          colspan: 1,
        });
        date.add(1, 'days');
      }
    }
    return days;
  };

  return (
    <tr key={room.number}>
      <td>{room.number}</td>
      {days.map((day) => (
        <td key={day.date + room.number} colSpan={day.colspan}>
          {day.isReserved ? (
            <div>
              <p>Reserved</p>
              <p>
                {day.reservation?.client.firstName}{' '}
                {day.reservation?.client.lastName}
              </p>
              {/* Aquí puedes mostrar más detalles de la reserva si es necesario */}
            </div>
          ) : (
            <p>&nbsp;</p> // Renderizar un espacio en blanco para días sin reserva
          )}
        </td>
      ))}
    </tr>
  );
};

export default CalendarRow;
