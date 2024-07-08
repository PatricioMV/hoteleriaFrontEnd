import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import RoomCard from "./RoomCard";

const HotelManagment = () => {
    const roomTypes = ['Single', 'Double', 'Suite'];


    return (
        <>
            <RoomCard roomTypes={roomTypes} />

            <Table>
                <thead>
                    <tr>
                        <th>Room Type</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Out of work</th>
                        <th>Occupied</th>
                        <th>Total</th>
                    </tr>
                </thead>
            </Table>
        </>
    )
}

export default HotelManagment;