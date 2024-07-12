import React, { useEffect, useState } from 'react';
import { getReservations } from '../services/api';
import { Table } from 'react-bootstrap';
import useReservationModal from '../hooks/useReservationModal';
import ReservationModal from './ReservationModal';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationModifiedFlag, setReservationModifiedFlag] = useState(false);
  //El handleSubmit en calendarRow es diferente.

  const toggleReservationModifiedFlag = () => {
    setReservationModifiedFlag(!reservationModifiedFlag);
  }

  useEffect(() => {
    getReservations()
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error("Error fetching reservations", error);
      });
  }, [reservationModifiedFlag]);


  const { reservationModalIsOpen, closeReservationModal, reservation, handleChange, handleSubmit, selectReservation } = useReservationModal(toggleReservationModifiedFlag);
  return (
    <div>
      <h1>Reservations</h1>
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>id</th><th>Client</th><th>Check-In</th><th>Check-Out</th><th>Nights stayed</th><th>Room</th>
          </tr>
        </thead>
        {reservations.map(reservation => (
          <tr onClick={() => selectReservation(reservation)}>
            <td>{reservation.id}</td><td>{reservation.client.firstName + " " + reservation.client.lastName}</td><td>{reservation.checkIn}</td><td>{reservation.checkOut}</td><td>{reservation.nightsStayed}</td><td>{reservation.room.number}</td>
          </tr>
        ))}
      </Table>
      <ReservationModal modalIsOpen={reservationModalIsOpen} closeModal={closeReservationModal} reservation={reservation} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Reservations;