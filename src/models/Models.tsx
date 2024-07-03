import moment from 'moment';
import { StringLiteral, TypeReference } from 'typescript';

export interface Room {
  id: number;
  number: number;
  type: string;
  comments?: string;
  available: boolean;
}

export const INITIAL_ROOM: Room = {
  id: 0,
  number: 0,
  type: '',
  available: true
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string,
  phoneNumber: number,
}

export const INTIAL_CLIENT: Client = {
  id: 0,
  firstName: '',
  lastName: '',
  dni: '',
  email: '',
  phoneNumber: 0,
}

export interface Reservation {
  id: number;
  client: Client;
  checkIn: string;
  checkOut: string;
  nightsStayed: number;
  room: Room;
}

export const INITIAL_RESERVATION: Reservation = {
  id: 0,
  client: INTIAL_CLIENT,
  checkIn: '',
  checkOut: '',
  nightsStayed: 0,
  room: INITIAL_ROOM
}

export interface Day {
  date: string;
  room: Room;
  isReserved: boolean;
  reservation?: Reservation;
  colspan: number;
}

export interface Payment {
  id: number;
  paymentDate: string;
  amount: number;
  reservation: Reservation;
}

export interface CalendarRowProps {
  room: Room;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

//Vale la pena de que esta interface tenga todo el modelo de cliente? revisalo x ahora lo dejo strig
/*
export interface CalendarDay {
date: string;
reserved: boolean;
client: string;
}

export interface CalendarCellProps {
day: any;
index: number;
room: Room;
handleMouseDown: (room: Room, date: string) => void;
handleMouseUp: (room: Room, date: string) => void;
checkInDate: string;
checkOutDate: string;
isDragging: boolean;
}*/

export interface FetchingResponse {
  error?: Error;
  rooms?: Room[];
  clients?: Client[];
  reservations?: Reservation[];
  payment?: Payment[];
}

export type Action =
  | { type: "SET_RESERVATION", payload: any }
  | { type: "SET_CHECK_IN", payload: string }
  | { type: "SET_CHECK_OUT", payload: string }
  | { type: "SET_CLIENT", payload: Client }
  | { type: "SET_ROOM", payload: Room }
  | { type: "SET_CLIENT_DNI", payload: string }
  | { type: "SET_CLIENT_FIRST_NAME", payload: string }
  | { type: "SET_CLIENT_LAST_NAME", payload: string }
  | { type: "SET_CLIENT_MAIL", payload: string }
  | { type: "SET_CLIENT_PHONE_NUMBER", payload: number }
