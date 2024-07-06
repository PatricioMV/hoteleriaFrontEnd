import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';
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
        <>
            < Container fluid={true} className="card-premium" >
                <Card.Title className="card-premium-title">Room:</Card.Title>
                <Row>
                    <Col xs='auto'>
                        <Form.Control type="text" value={room.number == 0 ? '' : room.number} placeholder='Number' onChange={(e) => handleRoomCard('number', e.target.value)} className="card-premium-control" />
                    </Col>
                    <Col xs='auto'>
                        {
                            room.type === 'New Type' ? (
                                <Form.Control
                                    type="text"
                                    placeholder="Enter new type"
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value)}
                                    className="card-premium-control"
                                />
                            ) :
                                <Form.Control
                                    as="select"
                                    value={room.type}
                                    onChange={(e) => handleRoomCard('type', e.target.value)}
                                    className="card-premium-control"
                                >
                                    <option value="" disabled selected>Select room type</option>
                                    {roomTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Form.Control>
                        }
                    </Col>
                    <Col xs='auto'>
                        <Form.Control type="text" placeholder='Comment' value={room.comments} onChange={(e) => handleRoomCard('comment', e.target.value)} className="card-premium-control" />
                    </Col>
                    <Col xs='auto' className="text-right">
                        {room.id !== 0 ? (
                            <>
                                <Col xs={12}>
                                    <Button variant="primary" style={{ marginRight: '10px' }} onClick={(e) => handleRoomCard('update', 'TENESQUEMODIFICARESTOPARAQUERECIBAUNPARAMETRO')}>
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={(e) => handleRoomCard('delete', 'TENESQUEMODIFICARESTOPARAQUERECIBAUNPARAMETRO')}>
                                        Delete
                                    </Button>
                                </Col>
                            </>
                        ) : (
                            <Button variant="primary" onClick={(e) => handleRoomCard('post', 'TENESQUEMODIFICARESTOPARAQUERECIBAUNPARAMETRO')}>
                                Submit
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RoomCard;
