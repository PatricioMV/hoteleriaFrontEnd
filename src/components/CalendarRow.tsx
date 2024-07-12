import React, { useState, useEffect } from 'react';
import { Reservation, Day, Room, CalendarRowProps } from '../models/Interfaces';
import { loadReservationsBetweenDatesById, updateClient } from '../services/apiUtils';
import moment from 'moment';
import ReservationModal from './ReservationModal';
import useNewReservationModal from '../hooks/useReservationModal';
import CalendarDay from './CalendarDay';

const CalendarRow: React.FC<CalendarRowProps> = ({ room, startDate, endDate }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [newReservationFlag, setNewReservationFlag] = useState<boolean>(false);

  const fetchReservations = async () => {
    try {
      const reservations: Reservation[] | void = await loadReservationsBetweenDatesById(
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
        room.id
      )
      if (Array.isArray(reservations) && reservations?.length > 0) {
        setDays(generateDays(startDate, endDate, reservations));
      } else {
        setDays(generateDays(startDate, endDate, []));
      }
    } catch (error) {
      setDays(generateDays(startDate, endDate, []));
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [room.id, startDate, endDate, newReservationFlag]);

  const generateDays = (startDate: moment.Moment, endDate: moment.Moment, reservations: Reservation[]): Day[] => {
    const days: Day[] = [];
    let auxDate = startDate.clone();
    while (auxDate.isBefore(endDate)) {
      const formattedDate = auxDate.format('YYYY-MM-DD');
      const reservation = reservations.find((r) => auxDate.isBetween(moment(r.checkIn), moment(r.checkOut), null, '[]'));
      if (reservation != undefined) {
        console.log(room)
        days.push({
          date: formattedDate,
          room: {
            ...room,
            occupied: true,
          },
          isReserved: true,
          reservation: reservation,
          colspan: reservation.nightsStayed,
        });
        auxDate.add(reservation.nightsStayed, 'days');
      } else {
        days.push({
          date: formattedDate,
          room: room,
          isReserved: false,
          colspan: 1,
        });
        auxDate.add(1, 'days');
      }
    }
    return days;
  };

  const handleNewReservation = () => {
    setNewReservationFlag(!newReservationFlag);
  };

  const { handleMouseDown, handleMouseUp, reservationModalIsOpen, closeReservationModal, reservation, handleChange, handleSubmit } = useNewReservationModal(handleNewReservation);

  return (
    <>
      <tr key={room.number}>
        <td >{room.number} {room.type}</td>
        {days.map((day) => <CalendarDay day={day} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} />)}
      </tr>

      <ReservationModal modalIsOpen={reservationModalIsOpen} closeModal={closeReservationModal} reservation={reservation} handleChange={handleChange} handleSubmit={handleSubmit} />

    </>
  );
};

export default CalendarRow;