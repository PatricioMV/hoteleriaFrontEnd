import { useReducer, useState, useEffect } from "react";
import { Action, Day, Reservation, INITIAL_RESERVATION } from "../models/Models";
import { createClient, createReservation, loadClientsById } from "../services/apiUtils";
import reservationReducer from "../reducers/reservationReducer";
import useDebounce from "./useDebounce";
import moment from "moment";

const useNewReservationModal = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [reservation, dispatch] = useReducer(reservationReducer, INITIAL_RESERVATION);
  const { checkIn, checkOut, client } = reservation;
  const [debouncedDni, isDoneWriting] = useDebounce(client.dni, 250);
  const [newReservationMade, setNewReservationMade] = useState<boolean>(false);

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
      dispatch({ type: "SET_CHECK_OUT", payload: date });
      dispatch({ type: "SET_ROOM", payload: room })
      setIsDragging(false);
      setModalIsOpen(true);
    }
  }

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

  const setClientDNI = (payload: string) => {
    dispatch({ type: "SET_CLIENT_DNI", payload: payload })
  }

  const setClientFirstName = (payload: string) => {
    dispatch({ type: "SET_CLIENT_FIRST_NAME", payload: payload })
  }

  const setClientLastName = (payload: string) => {
    dispatch({ type: "SET_CLIENT_LAST_NAME", payload: payload })
  }

  const setClientMail = (payload: string) => {
    dispatch({ type: "SET_CLIENT_MAIL", payload: payload })
  }

  const setCheckIn = (payload: string) => {
    dispatch({ type: "SET_CHECK_IN", payload: payload })
  }

  const setCheckOut = (payload: string) => {
    dispatch({ type: "SET_CHECK_OUT", payload: payload })
  }


  const closeModal = () => {
    setNewReservationMade(false)
    setModalIsOpen(false);
  };

  const handlePostReservation = (closeModal: any) => {
    createClient(client).then(createdClient => {
      const { id, checkIn, checkOut, ...strippedReservation } = reservation
      const formattedReservation = {
        ...strippedReservation,
        client: createdClient,
        checkIn: moment(checkIn).format('DD/MM/YYYY'),
        checkOut: moment(checkOut).format('DD/MM/YYYY'),
      }
      createReservation(formattedReservation).then(() => {
        setNewReservationMade(true);
        closeModal()
      })
    })
  }

  return { handleMouseDown, handleMouseUp, modalIsOpen, closeModal, checkIn, checkOut, setClientDNI, setClientFirstName, setClientLastName, setClientMail, client, handlePostReservation, newReservationMade }
}

export default useNewReservationModal;