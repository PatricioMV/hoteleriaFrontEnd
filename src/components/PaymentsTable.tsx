import { Table } from "react-bootstrap"
import { Reservation } from "../models/Interfaces"

interface PaymentsTableProps {
    reservation: Reservation;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ reservation }) => {
    const rows = reservation.payments || [];
    const emptyRows = 7 - rows.length;

    return (
        <Table striped bordered hover responsive >
            <thead >
                <th>Name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Nights stayed</th>
                <th>Paid</th>
                <th>Debt</th>
                <th>Room</th>
            </thead>
            {
                reservation.payments.map(payment =>
                    <tbody>
                        <tr key={payment.id}>
                            <td>{reservation.client.firstName}</td>
                            <td>{reservation.client.lastName}</td>
                            <td>{reservation.client.phoneNumber}</td>
                            <td>{reservation.checkIn}</td>
                            <td>{reservation.checkOut}</td>
                            <td>{reservation.nightsStayed}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.debtOnPayment}</td>
                            <td>{reservation.room.number}</td>
                        </tr>
                    </tbody>
                )
            }
            {emptyRows > 0 &&
                Array.from({ length: emptyRows }).map((_, index) => (
                    <tbody>
                        <tr key={rows.length + index}>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>

                ))}

        </Table>
    )
}

export default PaymentsTable;