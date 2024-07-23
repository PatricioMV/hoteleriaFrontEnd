import React, { useEffect, useState } from 'react';
import { getReservations } from '../services/api';
import { Alert, Table } from 'react-bootstrap';
import useReservationModal from '../hooks/useReservationModal';
import ReservationModal from './ReservationModal';
import { Reservation } from '../models/Interfaces';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationModifiedFlag, setReservationModifiedFlag] = useState(false);

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

  const { reservationModalIsOpen, closeReservationModal, reservation, handleChange, handleSubmit, selectReservation, alert, resetAlert } = useReservationModal(toggleReservationModifiedFlag);
  return (
    <div>
      <Table striped bordered hover responsive className="no-select reservations-table" size="sm" >
        {alert && (
          <Alert className="fixed-alert" variant={alert.variant} onClose={() => resetAlert()} dismissible>
            {alert.text}
          </Alert>
        )}
        <thead>
          <tr>
            <th>Client</th><th>Check-In</th><th>Check-Out</th><th>Nights stayed</th><th>Price</th><th>Debt</th><th>Room</th>
          </tr>
        </thead>
        {reservations.map(reservation => (
          <tr onClick={() => selectReservation(reservation)} key={reservation.id}>
            <td>{reservation.client.firstName + " " + reservation.client.lastName}</td><td>{reservation.checkIn}</td><td>{reservation.checkOut}</td><td>{reservation.nightsStayed}</td><td>{reservation.price}</td><td>{reservation.debt}</td><td>{reservation.room.number}</td>
          </tr>
        ))}
      </Table>
      <ReservationModal modalIsOpen={reservationModalIsOpen} closeModal={closeReservationModal} reservation={reservation} handleChange={handleChange} handleSubmit={handleSubmit} alert={alert} resetAlert={resetAlert} />
    </div>
  );
};

export default Reservations;