import React from 'react';
import Modal from 'react-modal';
import { useHotel } from '../hooks/useHotel';
import CalendarOptions from './CalendarOptions';
import Calendar from './Calendar';
import Spinner from './Spinner';
import ServerStartupToast from './ServerStartupToast';

Modal.setAppElement('#root');

const Home: React.FC = () => {
  const { rooms, numDays, handleNumDaysChange, loading, handleFilterEmptyChange, handleFilterUnavailableChange, filterUnavailable, filterEmpty, forceCalendarRender } = useHotel();

  return (
    <div>
      <CalendarOptions numDays={numDays} handleNumDaysChange={handleNumDaysChange} filterUnavailable={filterUnavailable} handleFilterUnavailableChange={handleFilterUnavailableChange} filterEmpty={filterEmpty} handleFilterEmptyChange={handleFilterEmptyChange} />
      {loading ? <Spinner /> : <Calendar numDays={numDays} rooms={rooms} forceCalendarRender={forceCalendarRender} />}
      <ServerStartupToast loading={loading} />
    </div>
  );
};

export default Home;
