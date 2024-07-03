import { useReducer, useState, useEffect, useCallback } from "react";
import { Action, Day, Reservation, INITIAL_RESERVATION } from "../models/Models";
import { createClient, createReservation, loadClientsById, loadReservationsById } from "../services/apiUtils";
import reservationReducer from "../reducers/reservationReducer";
import useDebounce from "./useDebounce";
import moment from "moment";
import { getTomorrow } from "../utils/dateUtils";

const useReservationModal = (onNewReservation: () => void) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [reservationModalIsOpen, setReservationModalIsOpen] = useState<boolean>(false);
  const [reservation, dispatch] = useReducer(reservationReducer, INITIAL_RESERVATION);
  const { checkIn, checkOut, client } = reservation;
  const [debouncedDni, isDoneWriting] = useDebounce(client.dni, 250);
  const [reservationMenuIsOpen, setReservationMenuIsOpen] = useState<boolean>(false);

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

  const handleMouseDown = useCallback(async (day: Day) => {
    const { room, date, isReserved } = day;
    if (!isReserved) {
      setIsDragging(true);
      dispatch({ type: "SET_CHECK_IN", payload: date });
    } else {
      try {
        const reservation = await loadReservationsById(day.reservation!.id);
        console.log(reservation!.checkIn)
        dispatch({ type: "SET_RESERVATION", payload: reservation });
        console.log(checkIn)
        setReservationModalIsOpen(true);
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    }
  }, []);

  const handleMouseUp = useCallback((day: Day) => {
    const { room, date, isReserved } = day;
    if (isDragging && !isReserved) {
      dispatch({ type: "SET_CHECK_OUT", payload: getTomorrow(date) });
      dispatch({ type: "SET_ROOM", payload: room });
      setIsDragging(false);
      setReservationModalIsOpen(true);
    }
  }, [isDragging]);

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
    await createReservation(formattedReservation);
    onNewReservation();
  };


  const closeReservationModal = () => {
    setReservationModalIsOpen(false);
  };

  return { handleMouseDown, handleMouseUp, reservationModalIsOpen, closeReservationModal, reservation, handleClientChange, handleSubmitReservation, reservationMenuIsOpen }
}

export default useReservationModal;