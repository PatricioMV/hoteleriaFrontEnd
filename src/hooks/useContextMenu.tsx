import { useState, useEffect, useRef, useCallback } from 'react';
import { ContextMenuOptions, Day, Reservation, Room } from '../models/Interfaces';
import { INITIAL_RESERVATION, INITIAL_ROOM } from '../models/models';
import { editRoom, updateReservation } from '../services/apiUtils';

const useContextMenu = (forceCalendarRender: () => void) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const reservationRef = useRef<Reservation>(INITIAL_RESERVATION);
    const [options, setOptions] = useState<ContextMenuOptions[]>([]);
    const roomRef = useRef<Room>(INITIAL_ROOM);

    const roomOptions: ContextMenuOptions[] = [
        {
            label: 'Room out of order',
            action: async () => {
                try {
                    const updatedRoom = { ...roomRef.current, outOfOrder: true };
                    await editRoom(updatedRoom);
                    forceCalendarRender();
                    roomRef.current = INITIAL_ROOM;
                    closeContextMenu();
                } catch (error) {
                    console.error('Error updating room:', error);
                }
            },
        },
    ];

    const updateReservationOptions = (reservation: Reservation): ContextMenuOptions[] => [
        {
            label: reservation.status === 'No-show' ? 'Check-in' : 'Check-out',
            action: async () => {
                try {
                    const updatedState = reservation.status === 'No-show' ? 'Checked-in' : 'Checked-out';
                    const updatedReservation: Reservation = { ...reservationRef.current, status: updatedState };
                    await updateReservation(updatedReservation);
                    reservationRef.current = INITIAL_RESERVATION;
                    forceCalendarRender();
                    closeContextMenu();
                } catch (error) {
                    console.error('Error updating reservation:', error);
                }
            },
        },
    ];

    const handleContextMenu = useCallback((event: React.MouseEvent, room: Room, day?: Day) => {
        event.preventDefault();
        if (!day) {
            roomRef.current = room;
            setOptions(roomOptions);
        } else {
            if (day.reservation?.status === 'Checked-out') return;
            reservationRef.current = day.reservation!;
            setOptions(updateReservationOptions(day.reservation!));
        }
        setMenuPosition({ x: event.pageX, y: event.pageY });
        setIsVisible(true);
    }, [roomOptions]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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




