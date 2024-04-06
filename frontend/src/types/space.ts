import {Device} from "./device.ts";

export interface Space {
    id: number,
    spaceName: string,
    devices?: Device[]
}