import React from 'react';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';
import useRoomCard from '../hooks/useRoomCard';
import { RoomCardProps } from '../models/Interfaces';

const RoomCard: React.FC<RoomCardProps> = ({ roomTypes, toggleNewRoomFlag }) => {
    const { room, handleRoomCard } = useRoomCard();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (room.id !== 0) {
            await handleRoomCard('update', toggleNewRoomFlag);
        } else {
            await handleRoomCard('post', toggleNewRoomFlag);
        }
    };

    return (
        <Container fluid={true} className="card-premium">
            <Card.Title className="card-premium-title">Room:</Card.Title>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs='auto'>
                        <Form.Control
                            type="number"
                            value={room.number === 0 ? '' : room.number}
                            placeholder='Number'
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value > 0) {
                                    handleRoomCard('number', value);
                                }
                            }}
                            min={1}
                            required
                            className="card-premium-control"
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Control
                            as="select"
                            value={room.type}
                            onChange={(e) => handleRoomCard('type', e.target.value)}
                            className="card-premium-control"
                            required
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
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={() => handleRoomCard('delete', toggleNewRoomFlag)}>
                                        Delete
                                    </Button>
                                </Col>
                            </>
                        ) : (
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        )}
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

export default RoomCard;
