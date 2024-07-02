import { AxiosResponse } from 'axios';
import {
  getRooms,
  getReservations,
  postReservation,
  getReservationsBetweenDatesById,
  getClientById,
  postClient,
} from './api';
import { Client, Room, Reservation, Payment } from '../models/Models';

export const loadRooms = async () => {
  try {
    const response: AxiosResponse<Room[]> = await getRooms();
    return response.data;
  } catch (error) {
    console.log('Error fetching Rooms', error);
  }
};

export const loadReservations = async (): Promise<Reservation[] | void> => {
  try {
    const response: AxiosResponse<Reservation[]> = await getReservations();
    return response.data;
  } catch (error) {
    console.log('Error fetching Reservations', error);
  }
};

export const createReservation = async (reservation: any) => {
  try {
    const response: AxiosResponse<Reservation> = await postReservation(reservation);
    return response.data;
  } catch (error) {
    console.log('Error POSTING Reservation', error);
  }
};

export const loadReservationsBetweenDatesById = async (from: string, to: string, roomId: number): Promise<Reservation[] | void> => {
  try {
    const response: AxiosResponse<Reservation[]> = await getReservationsBetweenDatesById(from, to, roomId);
    return response.data;
  } catch (error) {
    console.log('Error fetching Reservations between dates', error);
  }
};

export const loadClientsById = async (id: number): Promise<Client | void> => {
  try {
    const response: AxiosResponse<Client> = await getClientById(id);
    return response.data
  } catch (error) {
    console.log('Error fetching Client by id', error);
  }
}

export const createClient = async (client: Client): Promise<Client | void> => {
  try {
    const response: AxiosResponse<Client> = await postClient(client);
    return response.data;
  } catch (error) { console.log('Error posting Client', error); }
}
