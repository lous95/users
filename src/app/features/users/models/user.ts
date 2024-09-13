import { Address } from "../../locations/models/address";

export interface User {
    id?: number;
    name: string;
    birthdate: string;
    addresses: Address[];
}