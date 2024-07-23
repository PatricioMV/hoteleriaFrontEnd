import { PaymentDTO } from "../models/dtos";
import { Payment } from "../models/Interfaces";
import { convertReservationToDTO } from "./reservationConverter";

export const convertPaymentToDTO = (payment: Payment): PaymentDTO => {
    return {
        id: payment.id,
        paymentDate: payment.paymentDate,
        amount: payment.amount,
        reservation: convertReservationToDTO(payment.reservation),
        debt: payment.debtOnPayment,
    }
};

export const convertListOfPaymentsIntoDTO = (paymentsList: Payment[]): PaymentDTO[] => {
    const paymentsDTOList: PaymentDTO[] = [];
    for (const payment of paymentsList) {
        paymentsDTOList.push(convertPaymentToDTO(payment));
    }
    return paymentsDTOList;
}

