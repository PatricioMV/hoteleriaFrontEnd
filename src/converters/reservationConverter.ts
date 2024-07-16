import { ReservationDTO } from "../models/dtos";
import { Payment, Reservation } from "../models/Interfaces";
import { loadPaymentsByReservationId, loadRoomByNumber } from "../services/apiUtils";
import { convertClientToDTO } from "./clientConverter";
import {  convertListOfPaymentsIntoDTO } from "./paymentConverter";
import { convertRoomToDTO } from "./roomConverter";

export const convertReservationToDTO = (reservation: Reservation): ReservationDTO => {
    return {
        id: reservation.id,
        client: convertClientToDTO(reservation.client),
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        price: reservation.price,
        debt: reservation.debt,
        nightsStayed: reservation.nightsStayed,
        status: reservation.status,
        room: convertRoomToDTO(reservation.room),
    };
};

export const convertListOfReservationsToDTO = (listOfReservation: Reservation[]): ReservationDTO[] => {
    return listOfReservation.map(reservation => convertReservationToDTO(reservation));
};

export const convertDTOToReservation = async (reservationDTO: ReservationDTO): Promise<Reservation> => {
    const payments: Payment[] = await loadPaymentsByReservationId(reservationDTO.id)
    return {
        id: reservationDTO.id,
        client: reservationDTO.client,
        checkIn: reservationDTO.checkIn,
        checkOut: reservationDTO.checkOut,
        price: reservationDTO.price,
        debt: reservationDTO.debt,
        room: await loadRoomByNumber(reservationDTO.room.number),
        nightsStayed: reservationDTO.nightsStayed,
        status: reservationDTO.status,
        payments: convertListOfPaymentsIntoDTO(payments),
        comments: [],
    };
};

export const convertListOfReservationsDTOToReservations = async (reservationsDTOList: ReservationDTO[]): Promise<Reservation[]> => {
    const reservationsPromises = reservationsDTOList.map(convertDTOToReservation);
    return await Promise.all(reservationsPromises);
};