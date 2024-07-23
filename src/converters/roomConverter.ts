import { RoomDTO } from "../models/dtos";
import { Room } from "../models/Interfaces";
import { loadRoomSpecificationsById } from "../services/apiUtils";

export const convertRoomToDTO = (room: Room): RoomDTO => {
    return {
        id: room.id,
        number: room.number,
        roomSpecifications: room.roomSpecifications,
        occupied: room.occupied,
        outOfOrder: room.outOfOrder,
        comments: room.comments === undefined ? '' : room.comments
    };
};

export const convertDTOToRoom = async (roomDTO: RoomDTO): Promise<Room> => {
    const roomSpecifications = await loadRoomSpecificationsById(roomDTO.roomSpecifications.id);

    return {
        id: roomDTO.id,
        number: roomDTO.number,
        type: roomSpecifications.type,
        roomSpecifications: roomSpecifications,
        occupied: roomDTO.occupied,
        outOfOrder: roomDTO.outOfOrder,
    };
};
