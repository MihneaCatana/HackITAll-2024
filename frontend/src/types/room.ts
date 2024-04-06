import { Device } from "./device";

export interface Room {
    id: number,
    roomName: string,
    devices?: Device[]
}