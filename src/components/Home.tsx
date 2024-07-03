import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Modal from 'react-modal';
import CalendarRow from './CalendarRow';
import CalendarHeaders from './CalendarHeader';
import { useHotel } from '../hooks/useHotel';
import { getEndDate, getYesterday } from '../utils/dateUtils';

Modal.setAppElement('#root');

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
      <Table striped bordered hover responsive className="no-select" size="sm" >
        <thead>
          <CalendarHeaders numDays={numDays} />
        </thead>
        <tbody>
          {rooms.map((room) => (
            <CalendarRow
              room={room}
              startDate={getYesterday()}
              endDate={getEndDate(numDays)}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
