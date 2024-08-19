import Container from "react-bootstrap/Container";
import RoomCard from "./RoomCard";
import useRoomsTable from "../hooks/useRoomsTable";
import RoomsTable from "./RoomsTable";
import Alert from "react-bootstrap/Alert";
import Spinner from "./Spinner";

const HotelManagement = () => {
    const { roomTypes, toggleNewRoomFlag, roomsSpecifications, editableRow, formValues, handleChange, handleEdit, isAddingNew, handleSubmit, alert, resetAlert, loading } = useRoomsTable();

    return (
        <Container>
            <RoomCard roomTypes={roomTypes} toggleNewRoomFlag={toggleNewRoomFlag} />
            {alert && (
                <Alert className="fixed-alert" variant={alert.variant} onClose={() => resetAlert()} dismissible>
                    {alert.text}
                </Alert>
            )}
            {loading ? <Spinner /> : <RoomsTable roomsSpecifications={roomsSpecifications} editableRow={editableRow} formValues={formValues} handleChange={handleChange} handleSubmit={handleSubmit} handleEdit={handleEdit} isAddingNew={isAddingNew} />}
        </Container>
    );
};

export default HotelManagement;
