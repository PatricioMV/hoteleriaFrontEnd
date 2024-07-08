import { AxiosResponse } from 'axios';
import { getRooms, getReservations, postReservation, getReservationsBetweenDatesById, getClientById, postClient, getReservationById, getClientByDni, putClient, putReservation, deleteReservation, getOccupiedRoomsNumber, postRoom, getRoomByNumber, deleteRoom, switchOccupation } from './api';
import { Client, Room, Reservation, Payment } from '../models/Models';

export const loadRooms = async () => {
  try {
    const response: AxiosResponse<Room[]> = await getRooms();
    return response.data;
  } catch (error) {
    console.log('Error fetching Rooms', error);
  }
};

export const loadRoomByNumber = async (number: number) => {
  try {
    const response: AxiosResponse<Room> = await getRoomByNumber(number);
    return response.data;
  } catch (error) {
    console.log('Error loading Room', error);
  }
}

export const loadOccupiedRooms = async (from: string, to: string) => {
  try {
    const response: AxiosResponse<number[]> = await getOccupiedRoomsNumber(from, to);
    return response.data;
  } catch (error) {
    console.log('Error fetching occupied Rooms', error);
  }
}

export const createRoom = async (room: any) => {
  try {
    const response: AxiosResponse<Room> = await postRoom(room);
    return response.data;
  } catch (error) {
    console.log('Error posting Room', error);
  }
}

export const toggleOccupationStatus = async (roomNumber: number) => {
  try {
    const response: AxiosResponse<Room> = await switchOccupation(roomNumber);
    return response.data;
  } catch (error) {
    console.log('Error switching occupation for Room: ' + roomNumber, error);
  }
}

export const eraseRoom = async (id: number) => {
  try {
    const response: any = await deleteRoom(id);
    return response
  } catch (error) {
    console.log('Error deleting Room', error);
  }
}

export const loadReservations = async (): Promise<Reservation[] | void> => {
  try {
    const response: AxiosResponse<Reservation[]> = await getReservations();
    return response.data;
  } catch (error) {
    console.log('Error fetching Reservations', error);
  }
};

export const loadReservationsById = async (id: number): Promise<Reservation | void> => {
  try {
    const response: AxiosResponse<Reservation> = await getReservationById(id);
    return response.data;
  } catch (error) {
    console.log('Error fetching Reservation by id', error);
  }
}

export const createReservation = async (reservation: any) => {
  try {
    console.log(reservation.checkIn)
    const response: AxiosResponse<Reservation> = await postReservation(reservation);
    return response.data;
  } catch (error) {
    console.log('Error POSTING Reservation', error);
  }
};

export const updateReservation = async (reservation: Reservation) => {
  try {
    const response: AxiosResponse<Reservation> = await putReservation(reservation);
    return response.data;
  } catch (error) {
    console.log('Error PUTTING Reservation', error);
  }
}

export const loadReservationsBetweenDatesById = async (from: string, to: string, roomId: number): Promise<Reservation[] | void> => {
  try {
    const response: AxiosResponse<Reservation[] | void> = await getReservationsBetweenDatesById(from, to, roomId);
    return response.data;
  } catch (error) {
    console.log('Error fetching Reservations between dates', error);
  }
};

export const eraseReservation = async (id: number) => {
  try {
    const response: AxiosResponse = await deleteReservation(id);
  } catch (error) {
    console.log('Error deleting Reservation', error);
  }
}

export const loadClientsById = async (id: number): Promise<Client | void> => {
  try {
    const response: AxiosResponse<Client> = await getClientById(id);
    return response.data
  } catch (error) {
    console.log('Error fetching Client by id', error);
  }
}

export const loadClientByDni = async (dni: number): Promise<Client | void> => {
  try {
    const response: AxiosResponse<Client> = await getClientByDni(dni);
    return response.data;
  } catch (error) {
    console.log('Error fetching Client by dni', error);
  }
}

export const createClient = async (client: Client): Promise<Client | void> => {
  try {
    const response: AxiosResponse<Client> = await postClient(client);
    return response.data;
  } catch (error) {
    console.log('Error posting Client', error);
  }
}

export const updateClient = async (client: Client): Promise<Client | void> => {
  try {
    const response: AxiosResponse<Client> = await putClient(client);
    return response.data;
  } catch (error) {
    console.log('Error updating Client', error);
  }
}