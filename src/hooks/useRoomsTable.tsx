import { useEffect, useState } from "react";
import { AlertProps, RoomSpecifications } from "../models/Interfaces";
import { INITIAL_ROOM_SPECIFICATION } from "../models/models";
import { createRoomSpecifications, eraseRoomSpecification, loadRoomSpecifications, updateRoomSpecifications } from "../services/apiUtils";

const useRoomsTable = () => {
    const [roomTypes, setRoomTypes] = useState<string[]>([]);
    const [roomsSpecifications, setRoomsSpecifications] = useState<RoomSpecifications[]>([]);
    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [formValues, setFormValues] = useState<RoomSpecifications>(INITIAL_ROOM_SPECIFICATION);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [roomFlag, waveRoomFlag] = useState(false);
    const [alert, setAlert] = useState<AlertProps | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchRoomSpecifications = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
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
        try {
            if (type === "put") {
                await updateRoomSpecifications(formValues);
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
            resetAlert();
        } catch (error) {
            if (error instanceof Error) {
                setAlert({ variant: "warning", text: `Error: ${error.message}` });
            } else {
                console.error('Unexpected error:', error);
                setAlert({ variant: "warning", text: `Unexpected error` });
            }
        }
    };

    const resetAlert = () => {
        setAlert(null);
    }

    return { roomTypes, toggleNewRoomFlag, roomsSpecifications, editableRow, formValues, handleChange, handleEdit, isAddingNew, handleSubmit, alert, resetAlert, loading };
};

export default useRoomsTable;