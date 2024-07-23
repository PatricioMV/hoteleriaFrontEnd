import { useState, useEffect } from 'react';
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

  const handleFilterUnavailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterUnavailable(event.target.checked);
  };

  const handleFilterEmptyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEmpty(event.target.checked);
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
            filteredRooms = filteredRooms.filter(r => !r.outOfOrder);
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
  }, [filterEmpty, filterUnavailable, renderFlag, numDays]);



  return { rooms, numDays, handleNumDaysChange, loading, handleFilterEmptyChange, handleFilterUnavailableChange, filterUnavailable, filterEmpty, forceCalendarRender };
};
