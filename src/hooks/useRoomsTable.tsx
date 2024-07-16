import { useEffect, useState } from "react";
import { RoomSpecifications } from "../models/Interfaces";
import { INITIAL_ROOM_SPECIFICATION } from "../models/models";
import { putRoomSpecifications } from "../services/api";
import { createRoomSpecifications, eraseRoomSpecification, loadRoomSpecifications } from "../services/apiUtils";

const useRoomsTable = () => {
    const [roomTypes, setRoomTypes] = useState<string[]>([]);
    const [roomsSpecifications, setRoomsSpecifications] = useState<RoomSpecifications[]>([]);
    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [formValues, setFormValues] = useState<RoomSpecifications>(INITIAL_ROOM_SPECIFICATION);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [roomFlag, waveRoomFlag] = useState(false);

    useEffect(() => {
        const fetchRoomSpecifications = async () => {
            try {
                const roomSpecificationsDB = await loadRoomSpecifications();
                if (roomSpecificationsDB) {
                    setRoomsSpecifications(roomSpecificationsDB);
                    const uniqueRoomTypes = roomSpecificationsDB
                        .map(spec => spec.type)
                        .filter((type, index, self) => self.indexOf(type) === index);
                    setRoomTypes(uniqueRoomTypes)
                }
            } catch (error) {
                console.error("Error fetching room specifications:", error);
            }
        };
        fetchRoomSpecifications();
    }, [roomFlag]);

    const toggleNewRoomFlag = () => {
        waveRoomFlag(!roomFlag);
    };

    const resetForm = () => {
        setFormValues(INITIAL_ROOM_SPECIFICATION);
        setEditableRow(null);
        setIsAddingNew(false);
    };

    const handleEdit = (index: number, roomSpecification: RoomSpecifications) => {
        if (isAddingNew) {
            resetForm();
        }
        setEditableRow(index);
        setFormValues(roomSpecification);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (type: string) => {
        if (type === "put") {
            await putRoomSpecifications(formValues);
        } else if (type === "post") {
            await createRoomSpecifications(formValues);
        } else if (type === "delete") {
            await eraseRoomSpecification(formValues.id);
        }
        resetForm();
        if (type === "newType") {
            if (editableRow !== null) {
                resetForm();
            }
            setIsAddingNew(true);
        }
        toggleNewRoomFlag();
    };

    return { roomTypes, toggleNewRoomFlag, roomsSpecifications, editableRow, formValues, handleChange, handleEdit, isAddingNew, handleSubmit };
};

export default useRoomsTable;