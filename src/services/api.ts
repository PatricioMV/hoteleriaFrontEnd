import axios from 'axios';
import { Client, Room, Reservation, Payment  } from '../models/Models';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esta URL según tu configuración
});

//Reservation 
export const getReservations = () => api.get<Reservation[]>('/reservations');
export const postReservation = (reservation: Reservation) => api.post('/reservations', reservation);

export const getReservationsBetweenDatesById = (from: string, to: string, roomId: number) => api.get<Reservation[]>('/reservations/inbetween?startDate='+from+'&endDate='+to+'&roomId='+roomId); 

//Payment
export const getPayments = () => api.get('/payments');

//Rooms
export const getRooms = () => api.get('/rooms');
