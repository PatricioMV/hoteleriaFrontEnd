import { Button, Form, Table } from "react-bootstrap";
import { RoomTableProps } from "../models/Interfaces";

const RoomsTable: React.FC<RoomTableProps> = ({
    roomsSpecifications,
    editableRow,
    formValues,
    handleChange,
    handleSubmit,
    handleEdit,
    isAddingNew
}) => {
    return (
        <Table striped bordered hover className="rooms-table">
            <thead>
                <tr>
                    <th className="fixed-width">Type</th>
                    <th className="fixed-width">Price</th>
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
                        <td className="fixed-width">
                            {editableRow === index ? (
                                <Form.Control
                                    type="text"
                                    name="type"
                                    value={formValues.type}
                                    onChange={handleChange}
                                    required
                                />
                            ) : (
                                roomSpecification.type
                            )}
                        </td>
                        <td className="fixed-width">
                            {editableRow === index ? (
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={formValues.price}
                                    onChange={handleChange}
                                    required
                                />
                            ) : (
                                roomSpecification.price
                            )}
                        </td>
                        <td>{roomSpecification.rooms!.length}</td>
                        <td>{roomSpecification.rooms!.filter((rs) => rs.outOfOrder).length}</td>
                        <td>{roomSpecification.rooms!.filter((rs) => rs.occupied).length}</td>
                        <td>{roomSpecification.rooms!.length - roomSpecification.rooms!.filter((rs) => rs.outOfOrder).length - roomSpecification.rooms!.filter((rs) => rs.occupied).length}</td>
                        <td>
                            {editableRow === index ? (
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit('put'); }}>
                                    <Button variant="success" className="me-1" type="submit">Submit</Button>
                                    <Button variant="danger" type="button" onClick={() => handleSubmit('delete')}>Delete</Button>
                                </Form>
                            ) : (
                                <Button variant="primary" type="button" onClick={() => handleEdit(index, roomSpecification)}>Edit</Button>
                            )}
                        </td>
                    </tr>
                ))}
                {isAddingNew && (
                    <tr>
                        <td className="fixed-width">
                            <Form.Control
                                type="text"
                                name="type"
                                value={formValues.type}
                                onChange={handleChange}
                            />
                        </td>
                        <td className="fixed-width">
                            <Form.Control
                                type="text"
                                name="price"
                                value={formValues.price}
                                onChange={handleChange}
                            />
                        </td>
                        <td colSpan={4}></td>
                        <td>
                            <Button variant="success" type="button" onClick={() => handleSubmit('post')}>Submit</Button>
                        </td>
                    </tr>
                )}
                {!isAddingNew && (
                    <tr>
                        <td colSpan={6}></td>
                        <td>
                            <Button type="button" onClick={() => handleSubmit('newType')}>New Type</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default RoomsTable;