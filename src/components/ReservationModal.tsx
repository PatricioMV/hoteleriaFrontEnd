import React, { useState, useEffect, useReducer } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import moment from 'moment';
import useNewReservationModal from '../hooks/useReservationModal';
import { Room, Client, Reservation } from '../models/Models';

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
    const handleType = newReservation ? 'POST' : 'PUT';

    return (
        <Modal show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(handleType);
                }}>
                    <Row>
                        <Form.Group controlId="dni">
                            <Form.Label>DNI:</Form.Label>
                            <Form.Control type="number" placeholder="Enter DNI" value={client.dni} onChange={(e) => handleChange("dni", e.target.value)} className="no-spin" autoFocus />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First name" value={client.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Last name" value={client.lastName} onChange={(e) => handleChange("lastName", e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group controlId="email">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={client.email} onChange={(e) => handleChange("email", e.target.value)} />
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
                                <Form.Control type="date" value={checkIn} onChange={(e) => handleChange('checkIn', e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="checkOut">
                                <Form.Label>Check-Out Date</Form.Label>
                                <Form.Control type="date" value={checkOut} onChange={(e) => handleChange('checkOut', e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="primary" type="submit" >
                            Save
                        </Button>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleSubmit(handleType)}>
                    Create Reservation
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReservationModal;