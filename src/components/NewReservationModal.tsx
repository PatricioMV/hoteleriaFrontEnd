import React, { useState, useEffect, useReducer } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import moment from 'moment';
import useNewReservationModal from '../hooks/useNewReservationModal';
import { Room } from '../models/Models';
interface NewReservationModalProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    room: Room;
    checkIn: string;
    checkOut: string;
    dispatch: any;
}

const NewReservationModal: React.FC<NewReservationModalProps> = ({ modalIsOpen, closeModal, room, checkIn, checkOut, dispatch }) => {
    return (
        <Modal show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>New Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First name" onChange={(e) => dispatch({ type: "SET_CLIENT_FIRST_NAME", payload: e.target.value })} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Last name" onChange={(e) => dispatch({ type: "SET_CLIENT_LAST_NAME", payload: e.target.value })} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group controlId="email">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => dispatch({ type: "SET_CLIENT_MAIL", payload: e.target.value })} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="room">
                                <Form.Label>Room:</Form.Label>
                                <Form.Control type="number" value={room.number} readOnly />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="roomType">
                                <Form.Label>Room type:</Form.Label>
                                <Form.Control type="text" value={room.type} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="checkIn">
                                <Form.Label>Check-In Date</Form.Label>
                                <Form.Control type="date" value={checkIn} onChange={(e) => dispatch({ type: "SET_CHECK_IN", payload: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="checkOut">
                                <Form.Label>Check-Out Date</Form.Label>
                                <Form.Control type="date" value={checkOut} onChange={(e) => dispatch({ type: "SET_CHECK_OUT", payload: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="primary">
                            Save
                        </Button>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewReservationModal;

