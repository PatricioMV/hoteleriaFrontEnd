import React, { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { addNewCommentToReservation, eraseComment, loadCommentsByReservationId } from "../services/apiUtils";
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
    const [reloadCommentFlag, setReloadCommentFlag] = useState(false);
    const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss');
    const rows = renderedComments || [];
    const emptyRows = 7 - rows.length;


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsDB: Comment[] = await loadCommentsByReservationId(reservation.id);
                setRenderedComments(commentsDB);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        fetchComments();
    }, [reloadCommentFlag])

    const postComment = async () => {
        try {
            if (newComment.text.trim() !== '') {
                const savedReservation = await addNewCommentToReservation(newComment, reservation.id);
                const savedComment = savedReservation.comments[savedReservation.comments.length - 1]
                setRenderedComments([...renderedComments, savedComment]);
                setNewComment(INITIAL_COMMENT);
            }
        } catch (error) {
            console.log("Error putting new comment");
        }
    };

    const deleteComment = async (commentId: number) => {
        try {
            await eraseComment(commentId);
            const updatedComments = renderedComments.filter(comment => comment.id !== commentId);
            setRenderedComments(updatedComments);
            setReloadCommentFlag(!reloadCommentFlag);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <tbody>
                    {
                        renderedComments.map((comment, index) =>
                            <tr key={index} onClick={() => console.log(comment.id)}>
                                <td>{comment.text}</td>
                                <td className="d-flex align-items-center">
                                    <Form.Check aria-label="done" className="me-2" />
                                    <span className="me-2">Done</span>
                                    <Button variant="danger" className="p-2 d-flex align-items-center justify-content-center" onClick={() => deleteComment(comment.id!)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill me-1" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                        </svg>
                                    </Button>

                                </td>
                            </tr>


                        )
                    }
                    {Array.from({ length: Math.max(0, 7 - renderedComments.length) }).map((_, index) => (
                        <tr key={renderedComments.length + index}>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="justify-content-center" xs={10}>
                <Col >
                    <Form.Group controlId="newComment">
                        <FloatingLabel controlId="floatingNewComment" label="Comment">
                            <Form.Control
                                type="text"
                                placeholder="Enter your comment"
                                value={newComment.text}
                                onChange={(e) => setNewComment({
                                    text: e.target.value,
                                    timestamp: timestamp,
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
                        onClick={postComment}
                    >
                        Post comment
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default ReservationComments;
