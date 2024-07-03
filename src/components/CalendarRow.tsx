import React, { useState, useEffect } from 'react';
import { Reservation, Day, Room, CalendarRowProps } from '../models/Models';
import { loadReservationsBetweenDatesById } from '../services/apiUtils';
import moment from 'moment';
import ReservationModal from './ReservationModal';
import useNewReservationModal from '../hooks/useReservationModal';
import ReservationMenu from './ReservationMenu';

const CalendarRow: React.FC<CalendarRowProps> = ({ room, startDate, endDate }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [newReservationFlag, setNewReservationFlag] = useState<boolean>(false);

  const fetchReservations = async () => {
    try {
      const reservations = await loadReservationsBetweenDatesById(
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
        room.id
      )
      if (reservations) {
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
    let date = startDate.clone();
    while (date.isBefore(endDate)) {
      const formattedDate = date.format('YYYY-MM-DD');
      const reservation = reservations.find((r) => date.isBetween(moment(r.checkIn), moment(r.checkOut), null, '[]'));
      if (reservation) {
        const nightsStayed = moment(reservation.checkOut).diff(moment(formattedDate), 'days');
        days.push({
          date: formattedDate,
          room: room,
          isReserved: true,
          reservation: reservation,
          colspan: nightsStayed,
        });
        date.add(reservation.nightsStayed, 'days');
      } else {
        days.push({
          date: formattedDate,
          room: room,
          isReserved: false,
          colspan: 1,
        });
        date.add(1, 'days');
      }
    }
    return days;
  };

  const handleSubmitAndCloseModal = async () => {
    await handleSubmitReservation();
    closeReservationModal();
  };

  const handleNewReservation = () => {
    console.log(newReservationFlag)
    setNewReservationFlag(!newReservationFlag);
  };

  const { handleMouseDown, handleMouseUp, reservationModalIsOpen, closeReservationModal, reservation, handleClientChange, handleSubmitReservation, reservationMenuIsOpen } = useNewReservationModal(handleNewReservation);

  //console.log(days)
  //console.log(moment().format('YYYY-MM-DD'))

  return (
    <>
      <tr key={room.number}>
        <td >{room.number} {room.type}</td>
        {days.map((day) => (
          <td key={day.date + room.number} colSpan={day.colspan} className={moment().format('YYYY-MM-DD') === day.date ? 'today-header' : 'header'} onMouseDown={() => handleMouseDown(day)} onMouseUp={() => handleMouseUp(day)}>
            {day.isReserved ? (
              <div>
                {day.reservation?.client.firstName}{' '}{day.reservation?.client.lastName}
              </div>
            ) : (
              <p></p>
            )}
          </td>
        ))}
      </tr>

      <ReservationModal modalIsOpen={reservationModalIsOpen} closeModal={closeReservationModal} reservation={reservation} handleClientChange={handleClientChange} handleSubmit={handleSubmitAndCloseModal} />

    </>
  );
};

export default CalendarRow;