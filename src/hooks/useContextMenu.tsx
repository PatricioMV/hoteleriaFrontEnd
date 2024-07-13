import { useState, useEffect, useRef, useCallback } from 'react';
import { Day, Reservation, ReservationState, Room } from '../models/Interfaces';
import { INITIAL_RESERVATION, INITIAL_ROOM } from '../models/models';
import { updateReservation } from '../services/apiUtils';

const useContextMenu = (handleNewReservation: () => void) => {
    const [isVisible, setIsVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const reservationRef = useRef<Reservation>(INITIAL_RESERVATION);
    const [room, setRoom] = useState<Room>(INITIAL_ROOM);


    const roomOptions = [
        {
            label: 'Room out of order',
            action: () => {
                console.log('Option 1 selected');
                setRoom(INITIAL_ROOM);
                closeContextMenu();
            },
        },
    ];

    const [options, setOptions] = useState(roomOptions)

    const updateReservationOptions = (reservation: Reservation) => {
        return [
            {
                label: reservation.state === 'No-show' ? 'Check-in' : 'Check-out',
                action: () => {
                    const updatedState = reservation.state === 'No-show' ? 'Checked-in' : 'Checked-out';
                    const updatedReservation: Reservation = { ...reservationRef.current, state: updatedState };
                    updateReservation(updatedReservation)
                        .then(() => {
                            reservationRef.current = INITIAL_RESERVATION;
                            handleNewReservation();
                            closeContextMenu();
                        })
                        .catch((error) => {
                            console.error('Error updating reservation:', error);
                        });
                },
            }
        ];
    }

    const handleContextMenu = useCallback((event: any, room: Room, day?: Day) => {
        event.preventDefault();
        if (day === undefined) {
            setOptions(roomOptions);
            setRoom(room);
        } else {
            if (day.reservation?.state === "Checked-out") return;
            reservationRef.current = day.reservation!
            setOptions(updateReservationOptions(day.reservation!));
        }
        setMenuPosition({ x: event.pageX, y: event.pageY });
        setIsVisible(true);
    }, [roomOptions]);

    const handleClickOutside = useCallback((event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    }, []);

    const closeContextMenu = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return { menuRef, isVisible, menuPosition, handleContextMenu, closeContextMenu, options };
};

export default useContextMenu;

