import moment from 'moment';

export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string,
  phoneNumber: number,
}

export interface Room {
  id: number;
  number: number;
  type: string;
  roomSpecifications: RoomSpecifications;
  occupied: boolean;
  outOfOrder: boolean;
  comments?: string;
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
