import Container from "react-bootstrap/Container";
import RoomCard from "./RoomCard";
import useRoomsTable from "../hooks/useRoomsTable";
import RoomsTable from "./RoomsTable";

const HotelManagement = () => {
    const { roomTypes, toggleNewRoomFlag, roomsSpecifications, editableRow, formValues, handleChange, handleEdit, isAddingNew, handleSubmit } = useRoomsTable();

    return (
        <Container>
            <RoomCard roomTypes={roomTypes} toggleNewRoomFlag={toggleNewRoomFlag} />
            <RoomsTable roomsSpecifications={roomsSpecifications} editableRow={editableRow} formValues={formValues} handleChange={handleChange} handleSubmit={handleSubmit} handleEdit={handleEdit} isAddingNew={isAddingNew} />
        </Container>
    );
};

export default HotelManagement;
