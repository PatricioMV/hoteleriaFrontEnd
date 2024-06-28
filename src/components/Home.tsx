import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { loadRooms, loadReservations, createReservation } from '../services/apiUtils';
import { Table } from 'react-bootstrap';

Modal.setAppElement('#root');

function Home() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [numDays, setNumDays] = useState<number>(7);
  const [calendar, setCalendar] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    loadRooms(setRooms);
    loadReservations(setReservations);
    generateCalendar(numDays);
  }, [numDays])

  const generateCalendar = (days: number) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 
    const newCalendar = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(yesterday);
      date.setDate(date.getDate() + i);
      newCalendar.push(date.toLocaleDateString('es-AR', { day: 'numeric', month: 'numeric' }));
    }
    setCalendar(newCalendar);
  }

  const handleNumDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedDays = parseInt(event.target.value, 10);
      setNumDays(selectedDays);
    }

  const handleCellClick = (room: any, date: string) => {
    setSelectedRoom(room);
    setSelectedDate(date);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleReservationCreate = () => {
    const reservationData = {
      room: selectedRoom,
      checkIn: new Date(selectedDate.split('/').reverse().join('-')),
      checkOut: new Date(selectedDate.split('/').reverse().join('-')),
      client: { /* información del cliente */ }
    };

    createReservation(reservationData).then(() => {
      setModalIsOpen(false);
      loadReservations(setReservations); // Recargar las reservas
    }).catch((error: any )=> console.log("Error creating reservation", error));
  };

  return(
    <div>
      <h2>Home</h2>
      <label htmlFor='numDays'>Show:</label>
      <select id="numDays" value={numDays} onChange={handleNumDaysChange}>
        <option value={7}>7 days</option>
        <option value={15}>15 days</option>
        <option value={30}>30 days</option>
      </select>
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>Room:</th>
            {calendar.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            rooms.map(room => (
              <tr key={room.id}>
                <td>{room.number}</td>
                {
                  calendar.map((date, index) => (
                    <td 
                      key={index} 
                      onClick={() => handleCellClick(room, date)}
                      style={{ backgroundColor: 'white' }}
                    >
                      {/* Aquí podrías agregar lógica para mostrar información de reservas */}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Reservation"
      >
        <h2>Create Reservation</h2>
        <p>Room: {selectedRoom?.number}</p>
        <p>Date: {selectedDate}</p>
        <button onClick={handleReservationCreate}>Create</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  )
}

export default Home;
