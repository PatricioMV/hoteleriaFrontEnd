import { useState, useEffect, useRef, useCallback } from 'react';
import { Day, Reservation, ReservationState, Room } from '../models/Interfaces';
import { INITIAL_RESERVATION, INITIAL_ROOM } from '../models/models';
import { editRoom, updateReservation } from '../services/apiUtils';

const useContextMenu = (forceCalendarRender: () => void) => {
    const [isVisible, setIsVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const reservationRef = useRef<Reservation>(INITIAL_RESERVATION);
    const roomRef = useRef<Room>(INITIAL_ROOM);


    const roomOptions = [
        {
            label: 'Room out of order',
            action: () => {
                const updatedRoom = { ...roomRef.current, outOfOrder: true }
                editRoom(updatedRoom).then(() => {
                    forceCalendarRender();
                    roomRef.current = INITIAL_ROOM;
                    closeContextMenu();
                }).catch((error) => {
                    console.error('Error updating reservation:', error);
                });
            },
        },
    ];

    const [options, setOptions] = useState(roomOptions)

    const updateReservationOptions = (reservation: Reservation) => {
        return [
            {
                label: reservation.status === 'No-show' ? 'Check-in' : 'Check-out',
                action: () => {
                    const updatedState = reservation.status === 'No-show' ? 'Checked-in' : 'Checked-out';
                    const updatedReservation: Reservation = { ...reservationRef.current, status: updatedState };
                    updateReservation(updatedReservation)
                        .then(() => {
                            reservationRef.current = INITIAL_RESERVATION;
                            forceCalendarRender();
                            closeContextMenu();
                        }).catch((error) => {
                            console.error('Error updating reservation:', error);
                        });
                },
            }
        ];
    }

    const handleContextMenu = useCallback((event: any, room: Room, day?: Day) => {
        event.preventDefault();
        if (day === undefined) {
            roomRef.current = room;
            setOptions(roomOptions);
        } else {
            if (day.reservation?.status === "Checked-out") return;
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

