import { useEffect, useReducer } from "react"
import { INITIAL_ROOM } from "../models/Models"
import roomReducer from "../reducers/roomReducer"
import useDebounce from "./useDebounce";
import { createRoom, eraseRoom, loadRoomByNumber } from "../services/apiUtils";

const useRoomCard = () => {
    const [room, dispatch] = useReducer(roomReducer, INITIAL_ROOM);
    const { number } = room;
    const [debouncedNumber, isDoneWriting] = useDebounce(number, 250);

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
        switch (field) {
            case 'number':
                dispatch({ type: "SET_NUMBER", payload: value });
                break;
            case 'type':
                dispatch({ type: "SET_TYPE", payload: value })
                break;
            case 'isAvailable':
                dispatch({ type: "SET_IS_AVAILABLE", payload: value });
                break;
            case 'comment':
                dispatch({ type: "SET_COMMENT", payload: value });
                break;
            case 'post':
                const { id, ...restRoom } = room;
                createRoom(restRoom);
                dispatch({ type: "RESET_ROOM" });
                break;
            case 'delete':
                if (room.id) {
                    await eraseRoom(room.id);
                    dispatch({ type: "RESET_ROOM" });
                } else {
                    console.error('No room ID to delete');
                }
                break;
        }
    }

    return { room, handleRoomCard }
}

export default useRoomCard;