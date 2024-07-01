import React, { useState, useEffect, useReducer } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import moment from 'moment';
import useNewReservationModal from '../hooks/useNewReservationModal';

interface NewReservationModalProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    checkIn : string;
    checkOut: string;
}

const NewReservationModal: React.FC<NewReservationModalProps> = ({ modalIsOpen, closeModal, checkIn, checkOut }) => {
    return (
        <Modal show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>New Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="checkIn">
                                <Form.Label>Check-In Date</Form.Label>
                                <Form.Control type="date" value={checkIn}/>
                            </Form.Group>
                            <Form.Group controlId="checkOut">
                                <Form.Label>Check-In Date</Form.Label>
                                <Form.Control type="date" value={checkOut}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewReservationModal;

