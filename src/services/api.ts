import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esta URL según tu configuración
});

//Reservation 
export const getReservations = () => api.get('/reservations');
export const postReservation = (reservation: any) => api.post('/reservations', reservation);

//Payment
export const getPayments = () => api.get('/payments');

//Rooms
export const getRooms = () => api.get('/rooms');
