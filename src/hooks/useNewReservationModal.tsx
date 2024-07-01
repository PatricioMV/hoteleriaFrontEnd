import { useReducer, useState } from "react";
import { Action, Day, Reservation, INITIAL_RESERVATION } from "../models/Models";
import reservationReducer from "../reducers/reservationReducer";

const useNewReservationModal = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [{ checkIn, checkOut }, dispatch] = useReducer(reservationReducer, INITIAL_RESERVATION);

  const handleMouseDown = (day: Day) => {
    const { room, date, isReserved } = day;
    if (!isReserved) {
      setIsDragging(true);
      dispatch({ type: "SET_CHECK_IN", payload: date });
    }
  }

  const handleMouseUp = (day: Day) => {
    const { room, date, isReserved } = day;
    if (isDragging) {
      dispatch({ type: "SET_CHECK_OUT", payload: date });
      setIsDragging(false);
      setModalIsOpen(true);
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return { handleMouseDown, handleMouseUp, modalIsOpen, closeModal, checkIn, checkOut, dispatch }
}


export default useNewReservationModal;