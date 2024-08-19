import React, { useState } from 'react';
import { Alert, Button, Col, Container, FloatingLabel, Form, Modal, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { ReservationModalProps } from '../models/Interfaces';
import PaymentsTable from './PaymentsTable';
import ReservationComments from './ReservationComments';

const ReservationModal: React.FC<ReservationModalProps> = ({ modalIsOpen, closeModal, reservation, handleChange, handleSubmit, alert, resetAlert }) => {
    const { checkIn, checkOut, client, room } = reservation;
    const newReservation = reservation.id === 0 ? true : false;
    const modalTitle = newReservation ? 'New Reservation' : 'Update Reservation';
    const clientFound = client.id === 0 ? false : true;
    const [key, setKey] = useState<string>('reservationInfo');
    const [loading, setLoading] = useState<boolean>(false);

    const closeModalAndResetKey = () => {
        closeModal();
        setKey('reservationInfo');
        resetAlert();
        setLoading(false);
    }

    const handleActionWithReset = async (actionType: string) => {
        setLoading(true);
        resetAlert();
        try {
            await handleSubmit(actionType);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal show={modalIsOpen} onHide={closeModalAndResetKey} dialogClassName="custom-modal" size='xl'>
            {alert && (
                <Alert className="fixed-alert" variant={alert.variant} onClose={() => resetAlert()} dismissible>
                    {alert.text}
                </Alert>
            )}
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
                        <Modal.Footer>
                            {newReservation ? <Button onClick={() => { handleActionWithReset('POST') }}> Create Reservation {loading && <Spinner animation="border" size="sm" />}</Button> :
                                <Col className='button-container'>
                                    <Button className='Delete-Button' onClick={() => { handleActionWithReset('DELETE') }}>Delete </Button>
                                    <Button className='Update-Button' onClick={() => { handleActionWithReset('PUT') }}>Update {loading && <Spinner animation="border" size="sm" />}</Button>
                                </Col>}
                        </Modal.Footer>
                    </Tab>
                    <Tab eventKey="paymentsInfo" title="Payments">
                        <PaymentsTable reservation={reservation} />
                    </Tab>
                    <Tab eventKey="commentsInfo" title="Comments">
                        <ReservationComments comments={reservation.comments} reservation={reservation} />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default ReservationModal;