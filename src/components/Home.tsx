import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Room, Reservation } from '../models/Models';
import {
  loadRooms,
  loadReservationsBetweenDatesById,
  createReservation,
} from '../services/apiUtils';
import CalendarRow from './CalendarRow';
import TableHeaders from './TableHeader';
import { getReservationsBetweenDatesById } from '../services/api';
import { useHotel } from '../hooks/useHotel';
import moment from 'moment';

Modal.setAppElement('#root');

const roomUno: Room = {
  id: 2,
  number: 202,
  type: 'Suite',
  comments: '',
  available: true,
};

const Home: React.FC = () => {
  const { rooms, loading } = useHotel();
  const [numDays, setNumDays] = useState<number>(7);

  const handleNumDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDays = parseInt(event.target.value, 10);
    setNumDays(selectedDays);
  };

  return (
    <div>
      <label htmlFor="numDays">Show:</label>
      <select id="numDays" value={numDays} onChange={handleNumDaysChange}>
        <option value={7}>7 days</option>
        <option value={15}>15 days</option>
        <option value={30}>30 days</option>
      </select>
      <Table striped bordered hover responsive className="no-select">
        <thead>
          <tr>
            <th>Room:</th>
            <TableHeaders numDays={numDays} />
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <CalendarRow
              room={room}
              startDate={moment().subtract(1, 'days')}
              endDate={moment().add(numDays - 1, 'days')}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
