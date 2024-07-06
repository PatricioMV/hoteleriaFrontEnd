import { useEffect, useReducer } from "react"
import { INITIAL_ROOM } from "../models/Models"
import roomReducer from "../reducers/roomReducer"
import useDebounce from "./useDebounce";
import { createRoom, loadRoomByNumber } from "../services/apiUtils";

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
                }
            } catch (error) {
                console.error('Error fetching room:', error);
            }
        }
        getRoomByNumber();
    }, [debouncedNumber, isDoneWriting])

    const handleRoomCard = (field: string, value: any) => {
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
                createRoom(room);
                dispatch({ type: "RESET_ROOM" });
                break;
        }
    }

    return { room, handleRoomCard }
}

export default useRoomCard;