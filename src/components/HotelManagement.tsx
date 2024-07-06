import { Button, Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import RoomCard from "./RoomCard";

const HotelManagment = () => {
    const roomTypes = ['Single', 'Double', 'Suite'];


    return (
        <RoomCard roomTypes={roomTypes} />


    )
}

export default HotelManagment;