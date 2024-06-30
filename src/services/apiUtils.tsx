import { AxiosResponse } from 'axios';
import {
  getRooms,
  getReservations,
  postReservation,
  getReservationsBetweenDatesById,
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

export const createReservation = (reservation: any) => {
  return postReservation(reservation);
};

export const loadReservationsBetweenDatesById = async (
  from: string,
  to: string,
  roomId: number
): Promise<Reservation[] | void> => {
  try {
    const response: AxiosResponse<Reservation[]> =
      await getReservationsBetweenDatesById(from, to, roomId);
    return response.data;
  } catch (error) {
    console.log('Error fetching Reservations between dates', error);
  }
};
