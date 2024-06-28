import React, { useEffect, useState } from 'react';
import { getReservations } from '../services/api';

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
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>{reservation.client.firstName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;