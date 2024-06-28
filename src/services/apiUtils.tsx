import { getRooms, getReservations, postReservation } from './api'; 

export const loadRooms = (setRooms: React.Dispatch<React.SetStateAction<any[]>>) => {
  getRooms()
    .then(response => {
      setRooms(response.data);
    })
    .catch(error => console.log("Error fetching Rooms", error));
};

export const loadReservations = (setReservations: React.Dispatch<React.SetStateAction<any[]>>) => {
  getReservations()
    .then(response => {
      setReservations(response.data);
    })
    .catch(error => console.log("Error fetching Reservations", error));
};

export const createReservation = (reservation: any) => {
  return postReservation(reservation)
}

