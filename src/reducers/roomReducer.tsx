import { INITIAL_ROOM, Room } from "../models/Models";
import { createRoom } from "../services/apiUtils";

export type RoomAction =
    | { type: "SET_NUMBER", payload: number }
    | { type: "SET_TYPE", payload: string }
    | { type: "SET_IS_AVAILABLE", payload: boolean }
    | { type: "SET_COMMENT", payload: string }
    | { type: "POST_ROOM" }
    | { type: "DELETE_ROOM" }
    | { type: "RESET_ROOM" }

const roomReducer = (state: Room, action: RoomAction): Room => {
    const { type } = action;
    switch (type) {
        case "SET_NUMBER":
            return {
                ...state,
                number: action.payload
            }
        case "SET_TYPE":
            return {
                ...state,
                type: action.payload
            }
        case "SET_IS_AVAILABLE":
            return {
                ...state,
                available: action.payload
            }
        case "SET_COMMENT":
            return {
                ...state,
                comments: action.payload
            }
        case "RESET_ROOM":
            return {
                ...INITIAL_ROOM,
                comments: ''
            }
        default:
            return state;
    }
}

export default roomReducer;