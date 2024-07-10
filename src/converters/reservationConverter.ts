import { ReservationDTO } from "../models/dtos";
import { Reservation } from "../models/Interfaces";
import { loadRoomByNumber } from "../services/apiUtils";
import { convertClientToDTO } from "./clientConverter";
import { convertListOfPaymentsDTOIntoPayments, convertListOfPaymentsIntoDTOs } from "./paymentConverter";
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
        room: convertRoomToDTO(reservation.room),
        payments: convertListOfPaymentsIntoDTOs(reservation.payments)
    };
};

export const convertDTOToReservation = async (reservationDTO: ReservationDTO): Promise<Reservation> => {
    return {
        id: reservationDTO.id,
        client: reservationDTO.client,
        checkIn: reservationDTO.checkIn,
        checkOut: reservationDTO.checkOut,
        price: reservationDTO.price,
        debt: reservationDTO.debt,
        room: await loadRoomByNumber(reservationDTO.room.number),
        nightsStayed: reservationDTO.nightsStayed,
        payments: await convertListOfPaymentsDTOIntoPayments(reservationDTO.payments),
    };
};
