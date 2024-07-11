import React, { useState, useEffect, useReducer } from 'react';
import { Button, Col, Container, FloatingLabel, Form, FormLabel, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';
import moment from 'moment';
import useNewReservationModal from '../hooks/useReservationModal';
import { Room, Client, Reservation } from '../models/Interfaces';
import PaymentsModal from './PaymentsModal';
import { ReservationDTO } from '../models/dtos';
import PaymentsTable from './PaymentsTable';

interface ReservationModalProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    reservation: Reservation;
    handleChange: (value: any, field: string) => void;
    handleSubmit: (type: string) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ modalIsOpen, closeModal, reservation, handleChange, handleSubmit }) => {
    const { checkIn, checkOut, client, room } = reservation;
    const newReservation = reservation.id === 0 ? true : false;
    const modalTitle = newReservation ? 'New Reservation' : 'Update Reservation';
    const priceOrDebtText = newReservation ? 'Price:' : 'Debt:'
    const clientFound = client.id === 0 ? false : true;
    const { togglePaymentsModalIsOpen } = PaymentsModal();
    const [key, setKey] = useState<string>('clientInfo');

    console.log(reservation)

    return (
        <Modal show={modalIsOpen} onHide={closeModal} dialogClassName="custom-modal" size='xl'>
            <Modal.Header closeButton >
                <Modal.Title >{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs activeKey={key} onSelect={(k) => k && setKey(k)}>
                    <Tab eventKey="reservationInfo" title="Reservation Information">
                        <Form>
                            <Row>
                                <Col className={`m-1 ${clientFound ? 'found' : 'not-found'}`}>
                                    <Row className="p-1">
                                        <h6>Client Information</h6>
                                        <Form.Group controlId="dni">
                                            <FloatingLabel controlId="floatingDNI" label="DNI*">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter DNI*"
                                                    value={client.dni}
                                                    onChange={(e) => handleChange("dni", e.target.value)}
                                                    className="no-spin"
                                                    autoFocus
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row className="p-1">
                                        <Col>
                                            <Form.Group controlId="firstName">
                                                <FloatingLabel controlId="floatingFirstName" label="First Name*">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="First Name*"
                                                        value={client.firstName}
                                                        onChange={(e) => handleChange("firstName", e.target.value)}
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="lastName">
                                                <FloatingLabel controlId="floatingLastName" label="Last Name*">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Last Name*"
                                                        value={client.lastName}
                                                        onChange={(e) => handleChange("lastName", e.target.value)}
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="p-1">
                                        <Form.Group controlId="phone">
                                            <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Phone Number"
                                                    value={client.phoneNumber}
                                                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row className="p-1">
                                        <Form.Group controlId="email">
                                            <FloatingLabel controlId="floatingEmail" label="Email">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email"
                                                    value={client.email}
                                                    onChange={(e) => handleChange("email", e.target.value)}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                </Col>
                                <Col className="m-1 p-1">
                                    <Row>
                                        <h6>Room Information</h6>
                                        <Col>
                                            <Form.Group controlId="room">
                                                <Form.Control type="number" value={room.number} readOnly />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="roomType">
                                                <Form.Control type="text" value={room.roomSpecifications.type} readOnly />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="checkIn" className="pt-1">
                                                <Form.Label>Check-In:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={checkIn}
                                                    onChange={(e) => handleChange("checkIn", e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="checkOut" className="pt-1">
                                                <Form.Label>Check-Out:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={checkOut}
                                                    onChange={(e) => handleChange("checkOut", e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Group controlId="comment" className="pt-2">
                                            <FloatingLabel controlId="Comment" label="Comment">
                                                <Form.Control type="text" />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    {newReservation ? (<Row >
                                        <Form.Group controlId="debt">
                                            <Form.Label column sm="auto">Price:</Form.Label>
                                            <Col>
                                                <Form.Control type="number" readOnly disabled value={reservation.debt} />
                                            </Col>
                                        </Form.Group>
                                    </Row>) :
                                        <Container>
                                            <Row className="align-items-center pt-3">
                                                <Col>
                                                    <Form.Group as={Row} controlId="debt" className="align-items-center">
                                                        <Form.Label column sm="auto">Debt:</Form.Label>
                                                        <Col>
                                                            <Form.Control type="number" readOnly disabled value={reservation.debt} />
                                                        </Col>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs="auto">
                                                    <Form.Control type="number" placeholder='Payment' onChange={(e) => handleChange("payment", e.target.value)} />
                                                </Col>
                                            </Row>
                                        </Container>
                                    }
                                </Col>
                            </Row>
                        </Form>
                    </Tab>
                    <Tab eventKey="paymentsInfo" title="Payments">
                        <PaymentsTable reservation={reservation}></PaymentsTable>
                    </Tab>
                    <Tab eventKey="commentsInfo" title="Comments">

                    </Tab>
                </Tabs>

            </Modal.Body>
            <Modal.Footer>
                {newReservation ? <Button onClick={() => handleSubmit('POST')}> Create Reservation </Button> :
                    <Col className='button-container'>
                        <Button className='Delete-Button' onClick={() => handleSubmit('DELETE')}>Delete</Button>
                        <Button className='Update-Button' onClick={() => handleSubmit('PUT')}>Update</Button>
                    </Col>}

            </Modal.Footer>
        </Modal>

    );
};

export default ReservationModal;