import { AxiosResponse } from 'axios';
import { getRooms, getReservations, postReservation, getReservationsBetweenDatesById, getClientById, postClient, getReservationById, getClientByDni, putClient, putReservation, deleteReservation, getOccupiedRoomsNumber, postRoom, getRoomByNumber, deleteRoom, switchOccupation, getRoomSpecifications, getRoomSpecificationsByType, putRoom, postRoomSpecifications, deleteRoomSpecifications, getRoomSpecificationsById, getPaymentsByReservationId, postPayment, putNewComment, deleteComment, getCommentsByReservationId } from './api';
import { Client, Room, Reservation, Payment, RoomSpecifications, Comment } from '../models/Interfaces';

export const loadRooms = async (): Promise<Room[]> => {
  try {
    const response: AxiosResponse<Room[]> = await getRooms();
    return response.data;
  } catch (error) {
    console.log('Error fetching Rooms', error);
    throw error;
  }
};

export const loadRoomByNumber = async (number: number): Promise<Room> => {
  try {
    const response: AxiosResponse<Room> = await getRoomByNumber(number);
    return response.data;
  } catch (error) {
    console.log('Error loading Room', error);
    throw error;
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

export const editRoom = async (room: Room) => {
  try {
    const response: AxiosResponse<Room> = await putRoom(room);
    return response.data;
  } catch (error) {
    console.log('Error editing Room', error);
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

export const loadReservationsById = async (id: number): Promise<Reservation> => {
  try {
    const response: AxiosResponse<Reservation> = await getReservationById(id);
    return response.data;
  } catch (error) {
    console.log('Error fetching Reservation by id', error);
    throw error;
  }
}

export const createReservation = async (reservation: any) => {
  try {
    const response: AxiosResponse<Reservation> = await postReservation(reservation);
    return response.data;
  } catch (error: any) {
    console.log('Error POSTING Reservation', error);
    throw new Error(error.response.data);
  }
};

export const updateReservation = async (reservation: Reservation) => {
  try {
    const response: AxiosResponse<Reservation> = await putReservation(reservation);
    return response.data;
  } catch (error: any) {
    console.log('Error PUTTING Reservation', error);
    throw new Error(error.response.data);
  }
}

export const addNewCommentToReservation = async (newComment: Comment, reservationId: number): Promise<Reservation> => {
  try {
    console.log(reservationId)
    const response: AxiosResponse<Reservation> = await putNewComment(newComment, reservationId);
    return response.data;
  } catch (error) {
    console.log('Error PUTTING new comment on Reservation', error);
    throw error;
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

export const loadCommentsByReservationId = async (id: number): Promise<Comment[]> => {
  try {
    const response: AxiosResponse<Comment[]> = await getCommentsByReservationId(id);
    return response.data;
  } catch (error) {
    console.log('Error fetching comments');
    throw error;
  }
}

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
  } catch (error: any) {
    console.log('Error posting Client', error);
    throw new Error(error.response.data);
  }
}

export const updateClient = async (client: Client): Promise<Client | void> => {
  try {
    const response: AxiosResponse<Client> = await putClient(client);
    return response.data;
  } catch (error: any) {
    console.log('Error updating Client', error);
    throw new Error(error.response.data);
  }
}

export const createRoomSpecifications = async (roomSpecification: any) => {
  try {
    const response: AxiosResponse = await postRoomSpecifications(roomSpecification);
    return response.data;
  } catch (error: any) {
    console.log('Error POSTING RoomSpecifications', error);
    throw new Error(error.response.data);
  }
}

export const loadRoomSpecifications = async () => {
  try {
    const response: AxiosResponse<RoomSpecifications[]> = await getRoomSpecifications();
    return response.data;
  } catch (error) {
    console.log('Error loading RoomSpecifications', error);
  }
}

export const loadRoomSpecificationsById = async (id: number): Promise<RoomSpecifications> => {
  try {
    const response: AxiosResponse<RoomSpecifications> = await getRoomSpecificationsById(id);
    return response.data;
  } catch (error) {
    console.log('Error loading RoomSpecification by id', error);
    throw error; // Lanza el error para que el llamador pueda manejarlo
  }
};

export const loadRoomSpecificationsByType = async (type: string) => {
  try {
    const response: AxiosResponse<RoomSpecifications> = await getRoomSpecificationsByType(type);
    return response.data;
  } catch (error) {
    console.log('Error loading RoomSpecifications by type', error);
  }
}

export const eraseRoomSpecification = async (id: number) => {
  try {
    const response: AxiosResponse = await deleteRoomSpecifications(id);
    return response.data;
  } catch (error: any) {
    console.log('Error deleting RoomSpecifications id: ' + id, error);
    throw new Error(error.response.data);
  }
}

export const loadPaymentsByReservationId = async (id: number): Promise<Payment[]> => {
  try {
    const response: AxiosResponse<Payment[]> = await getPaymentsByReservationId(id);
    return response.data;
  } catch (error) {
    console.log('Error loading payments by reservation id: ' + id, error);
    throw error;
  }
}

export const createPayment = async (payment: any): Promise<Payment> => {
  try {
    const response: AxiosResponse<Payment> = await postPayment(payment);
    return response.data;
  } catch (error: any) {
    console.log('Error creating payment', error);
    throw new Error(error.response.data);
    throw error;
  }
}

export const eraseComment = async (id: number): Promise<String> => {
  try {
    const response: AxiosResponse<String> = await deleteComment(id);
    return response.data;
  } catch (error) {
    console.log('error deleting comment with id: ' + id, error);
    throw error;
  }
}