import { useEffect, useReducer, useState } from "react"
import { INITIAL_ROOM } from "../models/models";
import roomReducer from "../reducers/roomReducer"
import useDebounce from "./useDebounce";
import { createRoom, editRoom, eraseRoom, loadRoomByNumber, loadRoomSpecificationsByType } from "../services/apiUtils";
import { AlertProps } from "../models/Interfaces";

const useRoomCard = () => {
    const [room, dispatch] = useReducer(roomReducer, INITIAL_ROOM);
    const { number } = room;
    const [debouncedNumber, isDoneWriting] = useDebounce(number, 250);
    const [alert, setAlert] = useState<AlertProps | null>(null);

    useEffect(() => {
        const getRoomByNumber = async () => {
            try {
                const roomDB = await loadRoomByNumber(number);
                if (roomDB) {
                    dispatch({ type: "SET_ROOM", payload: roomDB })
                } else {
                    dispatch({ type: "ROOM_NOT_FOUND", payload: number })
                }
            } catch (error) {
                console.error('Error fetching room:', error);
            }
        }
        getRoomByNumber();
    }, [debouncedNumber, isDoneWriting])

    const handleRoomCard = async (field: string, value?: any) => {
        try {
            switch (field) {
                case 'number':
                    dispatch({ type: "SET_NUMBER", payload: value });
                    break;
                case 'type':
                    const roomSpecifications = await loadRoomSpecificationsByType(value);
                    dispatch({ type: "SET_SPECIFICATIONS", payload: roomSpecifications! })
                    dispatch({ type: "SET_TYPE", payload: value })
                    break;
                case 'isAvailable':
                    dispatch({ type: "SET_OUT_OF_ORDER", payload: value });
                    break;
                case 'comment':
                    dispatch({ type: "SET_COMMENT", payload: value });
                    break;
                case 'post':
                    const { id, ...restRoom } = room;
                    await createRoom(restRoom);
                    await value();
                    dispatch({ type: "RESET_ROOM" });
                    break;
                case 'update':
                    await editRoom(room);
                    await value();
                    break;
                case 'delete':
                    if (room.id) {
                        await eraseRoom(room.id);
                        await value();
                        dispatch({ type: "RESET_ROOM" });
                    } else {
                        console.error('No room ID to delete');
                    }
                    break;
            }
            resetAlert();
        } catch (error) {
            if (error instanceof Error) {
                setAlert({ variant: "warning", text: `Error: ${error.message}` });
            } else {
                console.error('Unexpected error:', error);
                setAlert({ variant: "warning", text: `Unexpected error` });
            }
        }
    }

    const resetAlert = () => {
        setAlert(null);
    }

    return { room, handleRoomCard, alert, resetAlert }
}

export default useRoomCard;