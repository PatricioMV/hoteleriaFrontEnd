import { useEffect, useState } from "react";
import { Day, Reservation, Room } from "../models/Interfaces";
import { loadReservationsBetweenDatesById } from "../services/apiUtils";
import { generateCalendarDays } from "../utils/dateUtils";

const useCalendarRow = (room: Room, startDate: moment.Moment, endDate: moment.Moment) => {
    const [days, setDays] = useState<Day[]>([]);
    const [newReservationFlag, setNewReservationFlag] = useState<boolean>(false);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const reservations: Reservation[] | void = await loadReservationsBetweenDatesById(
                    startDate.format('YYYY-MM-DD'),
                    endDate.format('YYYY-MM-DD'),
                    room.id
                );
                if (Array.isArray(reservations) && reservations?.length > 0) {
                    setDays(generateCalendarDays(room, startDate, endDate, reservations));
                } else {
                    setDays(generateCalendarDays(room, startDate, endDate, []));
                }
            } catch (error) {
                setDays(generateCalendarDays(room, startDate, endDate, []));
            }
        };
        fetchReservations();
    }, [room.id, startDate, endDate, newReservationFlag]);

    const handleNewReservation = () => {
        setNewReservationFlag(!newReservationFlag);
    };

    return { days, handleNewReservation };
};

export default useCalendarRow;