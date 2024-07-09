import { useReducer, useState, useEffect, useCallback } from "react";
import { ReservationAction, Day, Reservation } from "../models/Interfaces";
import { INITIAL_RESERVATION } from "../models/models";
import { createClient, createReservation, eraseReservation, loadClientByDni, loadClientsById, loadReservationsById, updateReservation } from "../services/apiUtils";
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
      const getClientByDni = async () => {
        try {
          const client = await loadClientByDni(parseInt(debouncedDni))
          if (client) {
            dispatch({ type: 'SET_CLIENT', payload: client });
          }
        } catch (error) { console.error('Error fetching client:', error); }
      }
      getClientByDni();
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
      dispatch({ type: "SET_ROOM", payload: room });
      dispatch({ type: "SET_CHECK_OUT", payload: getTomorrow(date) });
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
      dispatch({ type: "SET_CLIENT", payload: newClient });
      return newClient!.id
    }
    return 0;
  };

  const formatReservation = (reservation: Reservation) => {
    const isNewClient = reservation.client.id == 0 ? true : false;
    const { id, ...rest } = reservation;
    let formattedReservation = {
      ...rest,
      checkIn: moment(checkIn).format('YYYY-MM-DD'),
      checkOut: moment(checkOut).format('YYYY-MM-DD'),
    }
    if (isNewClient) {
      const { id, ...clientWithoutId } = reservation.client;
      return formattedReservation = {
        ...formattedReservation,
        client: {
          ...clientWithoutId,
        }
      }
    } else return formattedReservation;
  }

  const handleSubmit = async (type: string) => {
    if (type === 'POST') {
      const formattedReservation = formatReservation(reservation);
      await createReservation(formattedReservation)
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
    if (type === 'DELETE') {
      try { await eraseReservation(reservation.id); }
      catch (error) { console.log('error deleting reservation' + error) }
    }
    onNewReservation();
  };


  const closeReservationModal = () => {
    setReservationModalIsOpen(false);
    dispatch({ type: "RESET_RESERVATION" })
  };

  return { handleMouseDown, handleMouseUp, reservationModalIsOpen, closeReservationModal, reservation, handleChange, handleSubmit, reservationMenuIsOpen }
}

export default useReservationModal;