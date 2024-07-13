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
        <div ref={menuRef} style={{ top: y, left: x, position: 'absolute', zIndex: 1000, backgroundColor: 'white', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)' }} className="context-menu" onMouseLeave={closeContextMenu}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
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

