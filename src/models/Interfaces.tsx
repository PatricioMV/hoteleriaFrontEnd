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

export interface ReservationModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  reservation: Reservation;
  handleChange: (value: any, field: string) => void;
  handleSubmit: (type: string) => void;
  alert: AlertProps | null;
  resetAlert: () => void;
}

export interface ReservationCommentsProps {
  comments: Comment[];
  reservation: Reservation;
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

export interface CalendarDayProps {
  day: Day;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>, day: Day) => void;
  handleMouseUp: (day: Day) => void;
  handleContextMenu: (event: React.MouseEvent, room: Room, day?: Day) => void;
}

export interface RoomCardProps {
  roomTypes: string[];
  toggleNewRoomFlag: () => void;
}

export interface RoomTableProps {
  roomsSpecifications: RoomSpecifications[];
  editableRow: number | null;
  formValues: RoomSpecifications;
  handleChange: (e: any) => void;
  handleSubmit: (type: string) => void;
  handleEdit: (index: number, roomSpecification: RoomSpecifications) => void;
  isAddingNew: boolean;
}

export interface FetchingResponse {
  error?: Error;
  rooms?: Room[];
  clients?: Client[];
  reservations?: Reservation[];
  payment?: Payment[];
}

export type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"

export interface AlertProps {
  variant: AlertVariant;
  text: string;
}

