import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import RoomCard from "./RoomCard";
import { useEffect, useState } from "react";
import { createRoomSpecifications, eraseRoomSpecification, loadRoomSpecifications } from "../services/apiUtils";
import { INITIAL_ROOM_SPECIFICATION, Room, RoomSpecifications } from "../models/Models";
import { putRoomSpecifications } from "../services/api";

const initialstate: RoomSpecifications[] = [];

const HotelManagment = () => {
    const roomTypes = ['SINGLE', 'DOUBLE', 'TRIPLE', 'SUITE'];
    const [roomsSpecifications, setRoomsSpecifications] = useState(initialstate);
    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [formValues, setFormValues] = useState<RoomSpecifications>(INITIAL_ROOM_SPECIFICATION);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [roomFlag, waveRoomFlag] = useState(false);

    const toggleNewRoomFlag = () => {
        waveRoomFlag(!roomFlag);
    }

    const resetForm = () => {
        setFormValues(INITIAL_ROOM_SPECIFICATION);
        setEditableRow(null);
        setIsAddingNew(false);
    };

    const handleEdit = (index: number, roomSpecification: RoomSpecifications) => {
        if (isAddingNew) {
            resetForm();
        }
        setEditableRow(index);
        setFormValues(roomSpecification);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (type: string) => {
        if (type === "put") {
            await putRoomSpecifications(formValues);
        } else if (type === "post") {
            await createRoomSpecifications(formValues);
        } else if (type === "delete") {
            await eraseRoomSpecification(formValues.id);
        }
        resetForm();
        if (type === "newType") {
            if (editableRow !== null) {
                resetForm();
            }
            setIsAddingNew(true);
        }
        toggleNewRoomFlag();
    };

    useEffect(() => {
        const fetchRoomSpecifications = async () => {
            try {
                const roomSpecificationsDB = await loadRoomSpecifications();
                if (roomSpecificationsDB) setRoomsSpecifications(roomSpecificationsDB);
            } catch (error) {
                console.error("Error fetching room specifications:", error);
            }
        };
        fetchRoomSpecifications();
    }, [roomFlag]);

    return (
        <Container>
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
                                    <>
                                        <Button variant="success" onClick={() => handleSubmit('put')}>Submit</Button>
                                        <Button variant="danger" onClick={() => handleSubmit('delete')}>Delete</Button>
                                    </>
                                ) : (
                                    <Button variant="primary" onClick={() => handleEdit(index, roomSpecification)}>Edit</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {isAddingNew && (
                        <tr>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="type"
                                    value={formValues.type}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={formValues.price}
                                    onChange={handleChange}
                                />
                            </td>
                            <td colSpan={4}></td>
                            <td>
                                <Button variant="success" onClick={() => handleSubmit('post')}>Submit</Button>
                            </td>
                        </tr>
                    )}
                    {!isAddingNew && (
                        <tr>
                            <td colSpan={6}></td>
                            <td>
                                <Button onClick={() => handleSubmit('newType')}>New Type</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <br />
        </Container>
    );
};

export default HotelManagment;
