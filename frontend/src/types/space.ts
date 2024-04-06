import { Device } from "./device";

export interface Space {
    id?: number,
    officeName: string,
    devices: Device[]
}