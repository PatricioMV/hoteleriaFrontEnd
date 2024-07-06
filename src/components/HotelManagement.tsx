import { Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const HotelManagment = () => {

    return (
        <Card style={{ padding: '9px 20px 3px 10px' }} >
            <Card.Title>New Room</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Number:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Type:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Available:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>

        </Card>
    )
}

export default HotelManagment;