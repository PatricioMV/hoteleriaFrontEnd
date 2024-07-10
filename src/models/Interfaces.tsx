import moment from 'moment';

export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string,
  phoneNumber: number,
  address: string,
}

export interface Room {
  id: number;
  number: number;
  occupied: boolean;
  outOfOrder: boolean;
  comments?: string;
  roomSpecifications: RoomSpecifications;

  type: string;
}

export interface RoomSpecifications {
  id: number;
  type: string;
  price: number;
  rooms: Room[];
}


export interface Reservation {
  id: number;
  client: Client;
  checkIn: string;
  checkOut: string;
  price: number;
  debt: number;
  nightsStayed: number;
  room: Room;
  payments: Payment[];
}

export interface Payment {
  id: number;
  paymentDate: string;
  amount: number;
  reservation: Reservation;
}

export interface Day {
  date: string;
  room: Room;
  isReserved: boolean;
  reservation?: Reservation;
  colspan: number;
}

export interface CalendarRowProps {
  room: Room;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export interface FetchingResponse {
  error?: Error;
  rooms?: Room[];
  clients?: Client[];
  reservations?: Reservation[];
  payment?: Payment[];
}
