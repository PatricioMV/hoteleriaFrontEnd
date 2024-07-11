import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { addNewCommentToReservation } from "../services/apiUtils";
import moment from 'moment';
import { Comment, Reservation } from "../models/Interfaces";
import { INITIAL_RESERVATION } from "../models/models";

interface ReservationCommentsProps {
    comments: Comment[];
    reservation: Reservation;
}

const INITIAL_COMMENT: Comment = {
    text: '',
    timestamp: '',
    reservation: INITIAL_RESERVATION
}

const ReservationComments: React.FC<ReservationCommentsProps> = ({ comments, reservation }) => {
    const [renderedComments, setRenderedComments] = useState(comments);
    const [newComment, setNewComment] = useState(INITIAL_COMMENT);
    const timestamp = moment();
    const rows = renderedComments || [];
    const emptyRows = 7 - rows.length;

    const handlePostComment = async () => {
        if (newComment.text.trim() !== '') {
            try {
                await addNewCommentToReservation(newComment, reservation.id);
                setRenderedComments([...renderedComments, newComment]);
                setNewComment(INITIAL_COMMENT);
            } catch (error) {
                console.log("Error putting new comment");
            }
        }
    };

    return (
        <>
            <Table striped bordered hover responsive>
                <tbody>
                    {
                        renderedComments.map((comment, index) =>
                            <tr key={index}>
                                <td>{comment.text}</td>
                            </tr>
                        )
                    }
                    {emptyRows > 0 &&
                        Array.from({ length: emptyRows }).map((_, index) => (
                            <tr key={rows.length + index}>
                                <td>&nbsp;</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Row className="justify-content-center">
                <Col xs={10}>
                    <Form.Group controlId="newComment">
                        <FloatingLabel controlId="floatingNewComment" label="Comment">
                            <Form.Control
                                type="text"
                                placeholder="Enter your comment"
                                value={newComment.text}
                                onChange={(e) => setNewComment({
                                    text: e.target.value,
                                    timestamp: timestamp.format('YYYY-MM-DDTHH:mm:ss'),
                                    reservation: {
                                        id: reservation.id,
                                    }
                                })}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs={2} className="d-flex align-items-center m-0 p-0">
                    <Button
                        variant="success"
                        size="lg"
                        className="mb-1"
                        onClick={handlePostComment}
                    >
                        Post comment
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default ReservationComments;
