import React, { useState, useEffect } from 'react';
import { Reservation, Day, Room, CalendarRowProps } from '../models/Models';
import { loadReservationsBetweenDatesById } from '../services/apiUtils';
import moment from 'moment';
import { Modal } from 'react-bootstrap';

const useNewReservationModal = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [checkIn, setCheckin] = useState<string>();
  const [checkOut, setCheckout] = useState<string>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>();

  const handleMouseDown = (day: Day) => {
    const { room, date, isReserved } = day;
    if (!isReserved) {
      setIsDragging(true);
      setCheckin(date)
    }
  }

  const handleMouseUp = (day:Day) => {
    const { room, date, isReserved } = day;
    if (isDragging) {
      setCheckout(date);
      setIsDragging(false);
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return { handleMouseDown, handleMouseUp, modalIsOpen, closeModal}
}

const CalendarRow: React.FC<CalendarRowProps> = ({ room, startDate, endDate }) => {
  const [days, setDays] = useState<Day[]>([]);
  const { handleMouseDown, handleMouseUp, modalIsOpen, closeModal } = useNewReservationModal();

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
          room: room,
          isReserved: true,
          reservation: reservation,
          colspan: reservation.nightsStayed,
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

  return (
    <>
      <tr key={room.number}>
        <td>{room.number}</td>
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

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="My Modal"
        >
          <h2>My Modal</h2>
          <button onClick={closeModal}>Close</button>
          {/* Aquí puedes añadir más contenido para el modal */}
        </Modal>
      )}

      </>
  );
};

export default CalendarRow;
