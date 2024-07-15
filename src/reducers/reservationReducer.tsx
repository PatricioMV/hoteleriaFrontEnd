import moment from "moment";
import { Reservation, Client, Room } from "../models/Interfaces";
import { INITIAL_RESERVATION, INITIAL_CLIENT } from "../models/models";
import { createReservation } from "../services/apiUtils";
import { ClientDTO, INITIAL_CLIENT_DTO, INITIAL_RESERVATION_DTO, PaymentDTO, ReservationDTO, RoomDTO } from "../models/dtos";
import { convertReservationToDTO } from "../converters/reservationConverter";

export type ReservationAction =
    | { type: "SET_RESERVATION", payload: any }
    | { type: "SET_CLIENT", payload: Client }
    | { type: "SET_CHECK_IN", payload: string }
    | { type: "SET_CHECK_OUT", payload: string }
    | { type: "SET_PRICE", payload: number }
    | { type: "SET_DEBT", payload: number }

    | { type: "SET_ROOM", payload: Room }
    | { type: "SET_PAYMENTS", payload: number }


    | { type: "SET_CLIENT_FIRST_NAME", payload: string }
    | { type: "SET_CLIENT_LAST_NAME", payload: string }
    | { type: "SET_CLIENT_DNI", payload: string }
    | { type: "SET_CLIENT_EMAIL", payload: string }
    | { type: "SET_CLIENT_PHONE_NUMBER", payload: number }
    //SET_ADDRESS
    | { type: "RESET_RESERVATION" }

const reservationReducer = (state: Reservation, action: ReservationAction): Reservation => {
    const { type } = action;
    switch (type) {
        case "SET_RESERVATION":
            return {
                ...action.payload,
                checkIn: moment(action.payload.checkIn).format('YYYY-MM-DD'),
                checkOut: moment(action.payload.checkOut).format('YYYY-MM-DD')
            };
        case "SET_CHECK_IN":
            return {
                ...state,
                checkIn: action.payload,
            };
        case "SET_CHECK_OUT":
            const nightsStayed = moment(action.payload).diff(moment(state.checkIn), 'days');
            const debt = nightsStayed * state.room.roomSpecifications.price;
            return {
                ...state,
                checkOut: action.payload,
                nightsStayed: nightsStayed,
                debt: debt,
                price: debt,
            };
        case "SET_ROOM":
            return {
                ...state,
                room: action.payload
            }
        case "SET_PAYMENTS":
            return {
                ...state,
                payments: [
                    ...state.payments,
                    {
                        id: 0,
                        paymentDate: moment().format('YYYY-MM-DD'),
                        amount: action.payload,
                        reservation: convertReservationToDTO(state),
                        debt: state.debt - action.payload,
                    }
                ]
            };
        case "SET_CLIENT":
            return {
                ...state,
                client: action.payload,
            }
        case "SET_CLIENT_DNI":
            return {
                ...state,
                client: {
                    ...INITIAL_CLIENT_DTO,
                    dni: action.payload,
                },
            }
        case "SET_CLIENT_FIRST_NAME":
            return {
                ...state,
                client: {
                    ...state.client,
                    firstName: action.payload,
                },
            }
        case "SET_CLIENT_LAST_NAME":
            return {
                ...state,
                client: {
                    ...state.client,
                    lastName: action.payload,
                }
            }
        case "SET_CLIENT_EMAIL":
            return {
                ...state,
                client: {
                    ...state.client,
                    email: action.payload,
                }
            }
        case "SET_CLIENT_PHONE_NUMBER":
            return {
                ...state,
                client: {
                    ...state.client,
                    phoneNumber: action.payload,
                }
            }
        case "RESET_RESERVATION":
            return {
                ...INITIAL_RESERVATION
            }
        default:
            return state;
    }
}

export default reservationReducer;