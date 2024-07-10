import { ClientDTO } from "../models/dtos";
import { Client } from "../models/Interfaces";

export const convertClientToDTO = (client: Client): ClientDTO => {
    return {
        id: client.id === undefined? 0 : client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        dni: client.dni,
        email: client.email,
        phoneNumber: client.phoneNumber,
    };
};

export const convertDTOToClient = (clientDTO: ClientDTO): Client => {
    return {
        id: clientDTO.id,
        firstName: clientDTO.firstName,
        lastName: clientDTO.lastName,
        dni: clientDTO.dni,
        email: clientDTO.email,
        phoneNumber: clientDTO.phoneNumber,
    };
};
