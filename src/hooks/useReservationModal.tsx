import { useReducer, useState, useEffect, useCallback } from "react";
import { Action, Day, Reservation, INITIAL_RESERVATION } from "../models/Models";
import { createClient, createReservation, loadClientByDni, loadClientsById, loadReservationsById, updateReservation } from "../services/apiUtils";
import reservationReducer from "../reducers/reservationReducer";
import useDebounce from "./useDebounce";
import moment from "moment";
import { getTomorrow, isSameOrBefore } from "../utils/dateUtils";
import { putClient } from "../services/api";

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
          const client = await loadClientByDni(parseInt(debouncedDni))
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
    } else if (day.reservation != undefined) {
      try {
        const reservation = await loadReservationsById(day.reservation!.id);
        dispatch({ type: "SET_RESERVATION", payload: reservation });
        setReservationModalIsOpen(true);
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    }
  }, []);

  const handleMouseUp = useCallback((day: Day) => {
    const { room, date, isReserved } = day;

    if (isDragging && !isReserved && isSameOrBefore(checkIn, date)) {
      dispatch({ type: "SET_CHECK_OUT", payload: getTomorrow(date) });
      dispatch({ type: "SET_ROOM", payload: room });
      setIsDragging(false);
      setReservationModalIsOpen(true);
    }

    if (isDragging && !isSameOrBefore(checkIn, date)) {
      setIsDragging(false);
      dispatch({ type: "RESET_RESERVATION" });
    }
  }, [isDragging]);

  const handleChange = (field: string, value: any) => {
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
      case 'checkIn':
        dispatch({ type: "SET_CHECK_IN", payload: value });
        break;
      case 'checkOut':
        dispatch({ type: "SET_CHECK_OUT", payload: value });
        break;
      default:
        break;
    }
  };

  const postClient = async () => {
    const newClient = await createClient(client);
    console.log(newClient)
    if (newClient) {
      console.log('entro')
      dispatch({ type: "SET_CLIENT", payload: newClient });
      return newClient!.id
    }
    console.log('salio')
    return 0;
  };

  const handleSubmitReservation = async (type: string) => {
    if (type === 'POST') {
      let newClientid;
      if (client.id === 0) {
        newClientid = await postClient();
      }
      const { id, ...rest } = reservation;
      const formattedReservation = {
        ...rest,
        checkIn: moment(checkIn).format('YYYY-MM-DD'),
        checkOut: moment(checkOut).format('YYYY-MM-DD'),
        client: {
          ...client,
          id: newClientid,
        }
      }
      await createReservation(formattedReservation).then(r => console.log(r));
    }
    if (type === 'PUT') {
      await putClient(reservation.client);
      const formattedReservation = {
        ...reservation,
        checkIn: moment(checkIn).format('YYYY-MM-DD'),
        checkOut: moment(checkOut).format('YYYY-MM-DD'),
      }
      await updateReservation(formattedReservation);
    }
    onNewReservation();
  };


  const closeReservationModal = () => {
    setReservationModalIsOpen(false);
    dispatch({ type: "RESET_RESERVATION" })
  };

  return { handleMouseDown, handleMouseUp, reservationModalIsOpen, closeReservationModal, reservation, handleChange, handleSubmitReservation, reservationMenuIsOpen }
}

export default useReservationModal;