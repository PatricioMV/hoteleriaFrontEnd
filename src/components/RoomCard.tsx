import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';
import useRoomCard from '../hooks/useRoomCard';
import useDebounce from '../hooks/useDebounce';

interface RoomCardProps {
    roomTypes: string[];
    toggleNewRoomFlag: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ roomTypes, toggleNewRoomFlag }) => {
    const { room, handleRoomCard } = useRoomCard();


    return (
        <Container fluid={true} className="card-premium">
            <Card.Title className="card-premium-title">Room:</Card.Title>
            <Row>
                <Col xs='auto'>
                    <Form.Control
                        type="text"
                        value={room.number === 0 ? '' : room.number}
                        placeholder='Number'
                        onChange={(e) => handleRoomCard('number', e.target.value)}
                        className="card-premium-control"
                    />
                </Col>
                <Col xs='auto'>
                    <Form.Control
                        as="select"
                        value={room.type}
                        onChange={(e) => handleRoomCard('type', e.target.value)}
                        className="card-premium-control"
                    >
                        <option value="" disabled>Select room type</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
                <Col xs='auto'>
                    <Form.Control
                        type="text"
                        placeholder='Comment'
                        value={room.comments}
                        onChange={(e) => handleRoomCard('comment', e.target.value)}
                        className="card-premium-control"
                    />
                </Col>
                <Col xs='auto' className="text-right">
                    {room.id !== 0 ? (
                        <>
                            <Col xs={12}>
                                <Button
                                    variant="primary"
                                    style={{ marginRight: '10px' }}
                                    onClick={() => handleRoomCard('update', toggleNewRoomFlag)}
                                >
                                    Update
                                </Button>
                                <Button variant="danger" onClick={() => handleRoomCard('delete', toggleNewRoomFlag)}>
                                    Delete
                                </Button>
                            </Col>
                        </>
                    ) : (
                        <Button variant="primary" onClick={() => handleRoomCard('post', toggleNewRoomFlag)}>
                            Submit
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RoomCard;
