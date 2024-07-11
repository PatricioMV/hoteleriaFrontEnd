import { PaymentDTO } from "../models/dtos";
import { Payment } from "../models/Interfaces";
import { loadReservations, loadReservationsById } from "../services/apiUtils";
import { convertListOfReservationsToDTO, convertReservationToDTO } from "./reservationConverter";

export const convertPaymentToDTO = (payment: Payment): PaymentDTO => {
    return {
        id: payment.id,
        paymentDate: payment.paymentDate,
        amount: payment.amount,
        reservation: convertReservationToDTO(payment.reservation),
        debtOnPayment: payment.debtOnPayment,
    }
};

export const convertListOfPaymentsIntoDTO = (paymentsList: Payment[]): PaymentDTO[] => {
    const paymentsDTOList: PaymentDTO[] = [];
    for (const payment of paymentsList) {
        paymentsDTOList.push(convertPaymentToDTO(payment));
    }
    return paymentsDTOList;
}

export const convertDTOToPayment = async (paymentDTO: PaymentDTO): Promise<Payment> => {
    return {
        id: paymentDTO.id,
        paymentDate: paymentDTO.paymentDate,
        amount: paymentDTO.amount,
        reservation: await loadReservationsById(paymentDTO.reservation.id),
        debtOnPayment: paymentDTO.debtOnPayment,
    }
}
export const convertListOfPaymentsDTOIntoPayments = async (paymentsDTOList: PaymentDTO[]): Promise<Payment[]> => {
    const paymentPromises = paymentsDTOList.map(paymentDTO => convertDTOToPayment(paymentDTO));
    const paymentList = await Promise.all(paymentPromises);
    return paymentList as Payment[];
};