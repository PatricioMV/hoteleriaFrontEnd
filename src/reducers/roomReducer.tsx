import { Room, RoomSpecifications } from "../models/Interfaces";
import { INITIAL_ROOM } from "../models/models";
import { createRoom } from "../services/apiUtils";

export type RoomAction =
    | { type: "SET_ROOM", payload: Room }
    | { type: "SET_NUMBER", payload: number }
    | { type: "SET_TYPE", payload: string }
    | { type: "SET_SPECIFICATIONS", payload: RoomSpecifications }
    | { type: "SET_OCCUPIED", payload: boolean }
    | { type: "SET_OUT_OF_ORDER", payload: boolean }
    | { type: "SET_COMMENT", payload: string }
    | { type: "POST_ROOM" }
    | { type: "DELETE_ROOM" }
    | { type: "RESET_ROOM" }
    | { type: "ROOM_NOT_FOUND", payload: number }

const roomReducer = (state: Room, action: RoomAction): Room => {
    const { type } = action;
    switch (type) {
        case "SET_ROOM":
            return {
                ...action.payload
            }
        case "ROOM_NOT_FOUND":
            return {
                ...INITIAL_ROOM,
                number: action.payload
            }
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
        case "SET_SPECIFICATIONS":
            return {
                ...state,
                roomSpecifications: action.payload
            }
        case "SET_OCCUPIED":
            return {
                ...state,
                occupied: action.payload
            }
        case "SET_OUT_OF_ORDER":
            return {
                ...state,
                outOfOrder: action.payload
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