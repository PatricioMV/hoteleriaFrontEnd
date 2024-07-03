import { Dropdown } from "react-bootstrap";
import { Reservation } from "../models/Models";

const ReservationMenu: React.FC<{ reservation: Reservation, closeMenu: () => void }> = ({ reservation, closeMenu }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ReservationMenu;
