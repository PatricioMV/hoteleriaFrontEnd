import { useReducer, useState, useEffect } from "react";
import { Action, Day, Reservation, INITIAL_RESERVATION } from "../models/Models";
import { createClient, createReservation, loadClientsById } from "../services/apiUtils";
import reservationReducer from "../reducers/reservationReducer";
import useDebounce from "./useDebounce";
import moment from "moment";
import { getTomorrow } from "../utils/dateUtils";

const useNewReservationModal = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [reservation, dispatch] = useReducer(reservationReducer, INITIAL_RESERVATION);
  const { checkIn, checkOut, client } = reservation;
  const [debouncedDni, isDoneWriting] = useDebounce(client.dni, 250);
  const [newReservationMade, setNewReservationMade] = useState<boolean>(false);

  useEffect(() => {
    if (isDoneWriting && debouncedDni) {
      const getClientById = async () => {
        try {
          const client = await loadClientsById(parseInt(debouncedDni))
          if (client) {
            dispatch({ type: 'SET_CLIENT', payload: client });
          }
        } catch (error) { console.error('Error fetching client:', error); }
      }
      getClientById()
    }
  }, [debouncedDni, isDoneWriting])

  const handleMouseDown = (day: Day,) => {
    const { room, date, isReserved } = day;
    if (!isReserved) {
      setIsDragging(true);
      dispatch({ type: "SET_CHECK_IN", payload: date });
    }
  }

  const handleMouseUp = (day: Day) => {
    const { room, date, isReserved } = day;
    if (isDragging && !isReserved) {
      dispatch({ type: "SET_CHECK_OUT", payload: getTomorrow(date) });
      dispatch({ type: "SET_ROOM", payload: room })
      setIsDragging(false);
      setModalIsOpen(true);
    }
  }

  const handleClientChange = (field: string, value: any) => {
    switch (field) {
      case 'dni':
        dispatch({ type: 'SET_CLIENT_DNI', payload: value });
        break;
      case 'firstName':
        dispatch({ type: 'SET_CLIENT_FIRST_NAME', payload: value });
        break;
      case 'lastName':
        dispatch({ type: 'SET_CLIENT_LAST_NAME', payload: value });
        break;
      case 'email':
        dispatch({ type: 'SET_CLIENT_MAIL', payload: value });
        break;
      case 'phoneNumber':
        dispatch({ type: 'SET_CLIENT_PHONE_NUMBER', payload: value });
        break;
      default:
        break;
    }
  };

  const postClient = async () => {
    const newClient = await createClient(client);
    if (newClient) {
      dispatch({ type: "SET_CLIENT", payload: newClient });
    }
  };

  const handleSubmitReservation = async () => {
    if (client.id === 0) {
      await postClient();
    }
    const formattedReservation = {
      ...reservation,
      checkIn: moment(checkIn).format('DD/MM/YYYY'),
      checkOut: moment(checkOut).format('DD/MM/YYYY'),
    }
    createReservation(formattedReservation);
  };


  const closeModal = () => {
    setNewReservationMade(false)
    setModalIsOpen(false);
  };


  return { handleMouseDown, handleMouseUp, modalIsOpen, closeModal, checkIn, checkOut, client, newReservationMade, handleClientChange, handleSubmitReservation }
}

export default useNewReservationModal;