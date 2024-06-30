import { useState, useEffect } from 'react';
import { loadRooms } from '../services/apiUtils';
import { Room } from '../models/Models';

export const useHotel = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoading = (loading: boolean) => {
    setLoading(!loading);
  };

  useEffect(() => {
    try {
      setLoading(true);
      loadRooms().then((rooms) => {
        if (rooms) {
          setRooms(rooms);
          setLoading(false);
        }
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  return { rooms, loading };
};
