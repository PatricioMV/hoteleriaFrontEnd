import moment from 'moment';
import { PaymentDTO } from './dtos';

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
  type: string;
  occupied: boolean;
  outOfOrder: boolean;
  comments?: string;
  roomSpecifications: RoomSpecifications;

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
  status: ReservationState;
  room: Room;
  payments: PaymentDTO[];
  comments: Comment[];
}

export interface Comment {
  id?: number,
  text: string,
  timestamp: string //.format('YYYY-MM-DDTHH:mm:ss')
  reservation: {
    id: number
  }
}

export interface Payment {
  id: number;
  paymentDate: string;
  amount: number;
  reservation: Reservation;
  debtOnPayment: number;
}

export type ReservationState =
  | 'No-show'
  | 'Checked-in'
  | 'Checked-out'

export interface Day {
  date: string;
  room: Room;
  isReserved: boolean;
  reservation?: Reservation;
  colspan: number;
}

export interface CalendarOptionsProps {
  numDays: number;
  handleNumDaysChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filterUnavailable: boolean;
  handleFilterUnavailableChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterEmpty: boolean;
  handleFilterEmptyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CalendarProps {
  numDays: number;
  rooms: Room[];
  forceCalendarRender: () => void;
}

export interface CalendarHeadersProps {
  numDays: number;
}

export interface CalendarHeaderDays {
  date: string;
  class: string;
}

export interface CalendarRowProps {
  room: Room;
  startDate: moment.Moment;
  endDate: moment.Moment;
  forceCalendarRender: () => void;
}

export interface ContextMenuOptions {
  label: string;
  action: () => void;
}

export interface FetchingResponse {
  error?: Error;
  rooms?: Room[];
  clients?: Client[];
  reservations?: Reservation[];
  payment?: Payment[];
}
