import { useState } from "react";

const PaymentsModal = () => {
    const [paymentsModalIsOpen, setPaymentsModalIsOpen] = useState<boolean>(false);

    const togglePaymentsModalIsOpen = () => {
        setPaymentsModalIsOpen(!paymentsModalIsOpen);
    }

    return { togglePaymentsModalIsOpen }
}

export default PaymentsModal;