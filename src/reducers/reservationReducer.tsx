import { Action, Reservation } from "../models/Models";

const reservationReducer = (state: Reservation, action: Action): Reservation => {
    const { type, payload } = action;
    switch (type) {
        case "SET_CHECK_IN":
            return {
                ...state,
                checkIn: payload,
            };
        case "SET_CHECK_OUT":
            return {
                ...state,
                checkOut: payload,
            };
        case "SET_CLIENT_FIRST_NAME":
            return {
                ...state,
                client: {
                    ...state.client,
                    firstName: payload,
                },
            }
        case "SET_CLIENT_LAST_NAME":
            return {
                ...state,
                client: {
                    ...state.client,
                    lastName: payload,
                }
            }
        case "SET_CLIENT_MAIL":
            return {
                ...state,
                client: {
                    ...state.client,
                    email: payload,
                }
            }
        case "SET_CLIENT_PHONE_NUMBER":
            return {
                ...state,
                client: {
                    ...state.client,
                    phoneNumber: payload,
                }
            }
        default:
            return state;
    }
}

export default reservationReducer;