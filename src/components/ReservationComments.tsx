import React, { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { addNewCommentToReservation, eraseComment, loadCommentsByReservationId } from "../services/apiUtils";
import moment from 'moment';
import { Comment, ReservationCommentsProps } from "../models/Interfaces";
import { INITIAL_COMMENT } from "../models/models";

const ReservationComments: React.FC<ReservationCommentsProps> = ({ comments, reservation }) => {
    const [renderedComments, setRenderedComments] = useState(comments);
    const [newComment, setNewComment] = useState(INITIAL_COMMENT);
    const [reloadCommentFlag, setReloadCommentFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsDB: Comment[] = await loadCommentsByReservationId(reservation.id);
                setRenderedComments(commentsDB);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        if (reservation.id != 0) fetchComments();
    }, [reloadCommentFlag])

    const postComment = async () => {
        setLoading(true);
        try {
            if (newComment.text.trim() !== '') {
                const savedReservation = await addNewCommentToReservation(newComment, reservation.id);
                const savedComment = savedReservation.comments[savedReservation.comments.length - 1];
                setRenderedComments([...renderedComments, savedComment]);
                setNewComment(INITIAL_COMMENT);
            }
        } catch (error) {
            console.log("Error putting new comment");
        } finally {
            setLoading(false);
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
                                <td className="comment-column">{comment.text}</td>
                                <td className="d-flex align-items-center justify-content-center comment-button-column" >
                                    <Button
                                        variant="danger"
                                        className="d-flex align-items-center justify-content-center Delete-Button"
                                        size="lg"
                                        onClick={() => deleteComment(comment.id!)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                        >
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                    {Array.from({ length: Math.max(0, 7 - renderedComments.length) }).map((_, index) => (
                        <tr key={renderedComments.length + index}>
                            <td className="comment-column">&nbsp;</td>
                            <td className="comment-button-column">&nbsp;</td>
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
                        Post comment {loading && <Spinner animation="border" size="sm" />}
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default ReservationComments;
