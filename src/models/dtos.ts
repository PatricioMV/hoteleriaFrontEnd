import { ReservationState } from "./Interfaces";

export interface ClientDTO {
    id?: number;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    phoneNumber: number;
    address: string;
  }
  
  export interface RoomDTO {
    id: number;
    number: number;
    roomSpecifications: RoomSpecificationsDTO;
    occupied: boolean;
    outOfOrder: boolean;
    comments: string;
  }

  export interface RoomSpecificationsDTO {
    id: number;
    type: string;
    price: number;
  }
  
  export interface ReservationDTO {
    id: number;
    client: ClientDTO;
    checkIn: string;
    checkOut: string;
    price: number;
    debt: number;
    nightsStayed: number;
    status: ReservationState;
    room: RoomDTO;
  }
  
  export interface PaymentDTO {
    id?: number;
    paymentDate: string;
    amount: number;
    debtOnPayment: number;
    reservation: ReservationDTO;
  }
  
  export const INITIAL_ROOM_SPECIFICATIONS_DTO: RoomSpecificationsDTO = {
    id: 0,
    type: '',
    price: 0,
};

export const INITIAL_ROOM_DTO: RoomDTO = {
    id: 0,
    number: 0,
    roomSpecifications: INITIAL_ROOM_SPECIFICATIONS_DTO,
    occupied: false,
    outOfOrder: false,
    comments: '',
};

export const INITIAL_CLIENT_DTO: ClientDTO = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phoneNumber: 0,
    address: '',
};

export const INITIAL_RESERVATION_DTO: ReservationDTO = {
    id: 0,
    client: INITIAL_CLIENT_DTO,
    checkIn: '',
    checkOut: '',
    price: 0,
    debt: 0,
    room: INITIAL_ROOM_DTO,
    nightsStayed: 0,
    status: "No-show",
};

export const INITIAL_PAYMENT_DTO: PaymentDTO = {
    id: 0,
    paymentDate: '',
    amount: 0,
    reservation: INITIAL_RESERVATION_DTO,
    debtOnPayment: 0,
};
