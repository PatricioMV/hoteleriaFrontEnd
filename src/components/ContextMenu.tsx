import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { ReservationState } from '../models/Interfaces';

interface ContextMenuProps {
    menuRef: any;
    x: number;
    y: number;
    show: any;
    options: any;
    closeContextMenu: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ menuRef, x, y, show, closeContextMenu, options }) => {
    if (!show) return null;


    return (
        <div ref={menuRef} style={{ top: y, left: x }} className="context-menu" onMouseLeave={closeContextMenu}>
            <ul>
                {options.map((option: any, index: number) => (
                    <li key={index} onClick={() => option.action()}>
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContextMenu;

