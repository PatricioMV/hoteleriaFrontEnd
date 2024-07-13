import { useState, useEffect, useCallback } from 'react';
import { loadOccupiedRooms, loadRooms } from '../services/apiUtils';
import { Room } from '../models/Interfaces';
import { getEndDate, getYesterday } from '../utils/dateUtils';

export const useHotel = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [numDays, setNumDays] = useState<number>(7);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterUnavailable, setFilterUnavailable] = useState(false);
  const [filterEmpty, setFilterEmpty] = useState(false);
  const [renderFlag, setRenderFlag] = useState(false);

  const forceCalendarRender = () => {
    setRenderFlag(prevFlag => !prevFlag);
  };

  const handleNumDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDays = parseInt(event.target.value, 10);
    setNumDays(selectedDays);
  };

  const handleFilterUnavailableChange = (event: any) => {
    setFilterUnavailable(event.target.checked);
    console.log(filterUnavailable)
    // Lógica adicional para filtrar cuartos no disponibles
  };

  const handleFilterEmptyChange = (event: any) => {
    setFilterEmpty(event.target.checked);
    // Lógica adicional para quitar cuartos vacíos
  };

  const handleLoading = (loading: boolean) => {
    setLoading(!loading);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await loadRooms();
        if (roomsData) {
          let filteredRooms = roomsData;
          if (filterUnavailable) {
            //  filteredRooms = filteredRooms.filter(room => room.available);
          }
          if (filterEmpty) {
            const occupiedRooms = await loadOccupiedRooms(getYesterday().format('YYYY-MM-DD'), getEndDate(numDays).format('YYYY-MM-DD'));
            const occupiedRoomNumbers = new Set(occupiedRooms);
            filteredRooms = filteredRooms.filter(room => occupiedRoomNumbers.has(room.number));
          }
          setRooms(filteredRooms);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [filterEmpty, filterUnavailable, renderFlag]);


  return { rooms, numDays, handleNumDaysChange, loading, handleFilterEmptyChange, handleFilterUnavailableChange, filterUnavailable, filterEmpty, forceCalendarRender };
};
