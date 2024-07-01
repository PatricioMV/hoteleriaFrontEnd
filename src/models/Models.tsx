import moment from 'moment';
import { StringLiteral, TypeReference } from 'typescript';

export interface Room {
  id: number;
  number: number;
  type: string;
  comments: string;
  available: boolean;
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  dni: number;
}

export interface Reservation {
  id: number;
  client: Client;
  checkIn: string;
  checkOut: string;
  nightsStayed: number;
  room: Room;
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
