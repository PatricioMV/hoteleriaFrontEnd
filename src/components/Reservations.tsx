import React, { useEffect, useState } from 'react';
import { getReservations } from '../services/api';
import { Table } from 'react-bootstrap';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    getReservations()
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error("Error fetching reservations", error);
      });
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>id</th><th >Client</th><th>Check-In</th><th>Check-Out</th><th>Nights stayed</th><th>Room</th>
          </tr>
        </thead>
        {reservations.map(reservation => (
          <tr>
            <td>{reservation.id}</td><td >{reservation.client.firstName + " " + reservation.client.lastName}</td><td>{reservation.checkIn}</td><td>{reservation.checkOut}</td><td>{reservation.nightsStayed}</td><td>{reservation.room.number}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default Reservations;