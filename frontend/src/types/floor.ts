import { Room } from "./room";

export interface Floor {
    id: number,
    floorNumber: number,
    rooms: Room[]
}