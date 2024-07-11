import React from 'react';
import { Dropdown } from 'react-bootstrap';

const MenuComponent = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Menú
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Opción 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Opción 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Opción 3</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-4">Opción separada</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default MenuComponent;
