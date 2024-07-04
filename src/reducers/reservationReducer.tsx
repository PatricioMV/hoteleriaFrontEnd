import moment from "moment";
import { Action, INITIAL_RESERVATION, Reservation, INTIAL_CLIENT } from "../models/Models";
import { createReservation } from "../services/apiUtils";

const reservationReducer = (state: Reservation, action: Action): Reservation => {
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
            return {
                ...state,
                checkOut: action.payload,
            };
        case "SET_ROOM":
            return {
                ...state,
                room: action.payload
            }
        case "SET_CLIENT":
            console.log(action.payload)
            return {
                ...state,
                client: action.payload,
            }
        case "SET_CLIENT_DNI":
            return {
                ...state,
                client: {
                    ...INTIAL_CLIENT,
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
        case "SET_CLIENT_MAIL":
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