import axios from 'axios';
import { Client, Room, Reservation, Payment } from '../models/Models';

const api = axios.create({
  baseURL: 'http://localhost:8080/', // Change this configuration if necessary 
});

//Reservation
export const getReservations = () => api.get<Reservation[]>('/reservations');
export const getReservationById = (id: number) => api.get<Reservation>('/reservations/' + id);
export const postReservation = (reservation: Reservation) => api.post('/reservations', reservation);
export const putReservation = (reservation: Reservation) => api.put('/reservations', reservation);
export const deleteReservation = (id: number) => api.delete('/reservations/' + id);

export const getReservationsBetweenDatesById = (from: string, to: string, roomId: number) => api.get<Reservation[]>('/reservations/inbetween?startDate=' + from + '&endDate=' + to + '&roomId=' + roomId);

//Payment
export const getPayments = () => api.get('/payments');

//Rooms
export const getRooms = () => api.get('/rooms');
export const getOccupiedRoomsNumber = (from: string, to:string) => api.get<number[]>('/rooms/occupiedRoomsBetweenDates?startDate=' + from + '&endDate=' + to);
export const postRoom = (room: Room) => api.post('/rooms', room);


//Client
export const getClientById = (id: number) => api.get<Client>('/clients/id=' + id);
export const getClientByDni = (dni: number) => api.get<Client>('/clients/' + dni);
export const postClient = (client: Client) => api.post('/clients', client);
export const putClient = (client: Client) => api.put('/clients', client);