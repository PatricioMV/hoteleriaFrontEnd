import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import RoomCard from "./RoomCard";
import { useEffect, useState } from "react";
import { loadRoomSpecifications } from "../services/apiUtils";
import { INITIAL_ROOM_SPECIFICATION, Room, RoomSpecifications } from "../models/Models";

const initialstate: RoomSpecifications[] = []

const HotelManagment = () => {
    const roomTypes = ['SINGLE', 'DOUBLE', 'TRIPLE', 'SUITE'];
    const [roomsSpecifications, setRoomsSpecifications] = useState(initialstate);
    const [editableRow, setEditableRow] = useState(999);
    const [formValues, setFormValues] = useState(INITIAL_ROOM_SPECIFICATION);
    const [newRoomFlag, setNewRoomFlag] = useState(false);

    const toggleNewRoomFlag = () => {
        setNewRoomFlag(!newRoomFlag);
    }

    const handleEdit = (index: number, roomSpecification: RoomSpecifications) => {
        setEditableRow(index);
        setFormValues(roomSpecification);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (index: any) => {
        console.log("Updated values:", formValues);
        // Aquí deberías manejar la lógica para guardar los cambios
        setEditableRow(999);
    };

    useEffect(() => {
        const fetchRoomSpecifications = async () => {
            try {
                const roomSpecificationsDB = await loadRoomSpecifications();
                if (roomSpecificationsDB) setRoomsSpecifications(roomSpecificationsDB);
            } catch (error) {
                console.error("Error fetching room specifications:", error);
            }
        }
        fetchRoomSpecifications();
    }, [newRoomFlag])

    return (
        <>
            <RoomCard roomTypes={roomTypes} toggleNewRoomFlag={toggleNewRoomFlag} />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Total Rooms</th>
                        <th>Out of Order</th>
                        <th>Occupied</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roomsSpecifications.map((roomSpecification, index) => (
                        <tr key={index}>
                            <td>
                                {editableRow === index ? (
                                    <Form.Control
                                        type="text"
                                        name="type"
                                        value={formValues.type}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    roomSpecification.type
                                )}
                            </td>
                            <td>
                                {editableRow === index ? (
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={formValues.price}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    roomSpecification.price
                                )}
                            </td>
                            <td>{roomSpecification.rooms.length}</td>
                            <td>{roomSpecification.rooms.filter((rs) => rs.outOfOrder).length}</td>
                            <td>{roomSpecification.rooms.filter((rs) => rs.occupied).length}</td>
                            <td>{roomSpecification.rooms.length}</td>
                            <td>
                                {editableRow === index ? (
                                    <Button variant="success" onClick={() => handleSubmit(index)}>Submit</Button>
                                ) : (
                                    <Button variant="primary" onClick={() => handleEdit(index, roomSpecification)}>Edit</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <br />
        </>
    )
}

export default HotelManagment;