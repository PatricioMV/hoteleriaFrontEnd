import { Client, Comment, ContextMenuOptions, Payment, Reservation, Room, RoomSpecifications } from "./Interfaces";

export const INITIAL_ROOM_SPECIFICATION: RoomSpecifications = {
    id: 0,
    type: '',
    price: 0,
    rooms: [],
}

export const INITIAL_ROOM: Room = {
    id: 0,
    number: 0,
    type: '',
    roomSpecifications: INITIAL_ROOM_SPECIFICATION,
    occupied: false,
    outOfOrder: false,
}

export const INITIAL_CLIENT: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phoneNumber: 0,
    address: '',
}

export const INITIAL_RESERVATION: Reservation = {
    id: 0,
    client: INITIAL_CLIENT,
    checkIn: '',
    checkOut: '',
    price: 0,
    debt: 0,
    nightsStayed: 0,
    status: 'No-show',
    room: INITIAL_ROOM,
    payments: [],
    comments: [],
}

export const INITIAL_PAYMENT: Payment = {
    id: 0,
    paymentDate: '',
    amount: 0,
    reservation: INITIAL_RESERVATION,
    debtOnPayment: 0,
}

export const INITIAL_COMMENT: Comment = {
    text: '',
    timestamp: '',
    reservation: INITIAL_RESERVATION
}

export const INITIAL_CONTEXT_MENU_OPTION: ContextMenuOptions = {
    label: '',
    action: () => { },
}