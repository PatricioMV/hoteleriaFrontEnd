import { Action, Reservation } from "../models/Models";

const reservationReducer = (state:Reservation, action:Action): Reservation => {
    const { type, payload } = action;
    switch (type) {
        case "SET_CHECKIN":
          return {
            ...state,
            checkIn: payload,
          };
        case "SET_CHECKOUT":
          return {
            ...state,
            checkOut: payload,
          };
        default:
          return state;
      }
  }

export default reservationReducer;