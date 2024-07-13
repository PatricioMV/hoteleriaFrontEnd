import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import CalendarRow from './CalendarRow';
import CalendarHeaders from './CalendarHeader';
import { useHotel } from '../hooks/useHotel';
import { getEndDate, getYesterday } from '../utils/dateUtils';

Modal.setAppElement('#root');

const Home: React.FC = () => {
  const { rooms, numDays, handleNumDaysChange, loading, handleFilterEmptyChange, handleFilterUnavailableChange, filterUnavailable, filterEmpty, forceCalendarRender } = useHotel();

  return (
    <div>
      <Row >
        <Col>
          <label htmlFor="numDays">Show:</label>
          <select id="numDays" value={numDays} onChange={handleNumDaysChange}>
            <option value={7}>7 days</option>
            <option value={15}>15 days</option>
            <option value={30}>30 days</option>
          </select>
        </Col>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                id="filterUnavailable"
                checked={filterUnavailable}
                onChange={handleFilterUnavailableChange}
              />
              <label htmlFor="filterUnavailable">Filtrar cuartos no disponibles</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="filterEmpty"
                checked={filterEmpty}
                onChange={handleFilterEmptyChange}
              />
              <label htmlFor="filterEmpty">Quitar cuartos vacíos</label>
            </div>
          </div>
        </Col>
      </Row>
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
              forceCalendarRender={forceCalendarRender}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
