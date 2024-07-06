import React, { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import useRoomCard from '../hooks/useRoomCard';

interface RoomCardProps {
    roomTypes: string[];
}

const RoomCard: React.FC<RoomCardProps> = ({ roomTypes }) => {
    const [selectedType, setSelectedType] = useState('');
    const [newType, setNewType] = useState('');
    const { room, handleRoomCard } = useRoomCard();


    const handleSubmit = () => {
        console.log(room);
    };

    return (
        <Card className="card-premium">
            <Card.Title className="card-premium-title">New Room</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="card-premium-label">Number:</Form.Label>
                            <Form.Control type="text" className="card-premium-control" value={room.number} onChange={(e) => handleRoomCard('number', e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="card-premium-label">Type:</Form.Label>
                            <Form.Control
                                as="select"
                                value={room.type}
                                onChange={(e) => handleRoomCard('type', e.target.value)}
                                className="card-premium-control"
                            >
                                {roomTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Control>
                            {selectedType === 'New Type' && (
                                <Form.Control
                                    type="text"
                                    placeholder="Enter new type"
                                    value={newType}
                                    className="card-premium-control"
                                    style={{ marginTop: '10px' }}
                                />
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="card-premium-label">Available:</Form.Label>
                            <Form.Control as="select" value={room.available ? 'true' : 'false'} onChange={(e) => handleRoomCard('isAvailable', e.target.value === 'true')} className="card-premium-control">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="card-premium-label">Comment:</Form.Label>
                            <Form.Control type="text" value={room.comments} onChange={(e) => handleRoomCard('comment', e.target.value)} className="card-premium-control" />
                        </Form.Group>
                    </Col>
                    <Col className="text-right">
                        <Button variant="primary" onClick={(e) => handleRoomCard('post', 'TENESQUEMODIFICARESTOPARAQUERECIBAUNPARAMETRO')}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default RoomCard;

