import {Device} from "./device.ts";

export interface Space {
    id: number,
    name: string,
    devices?: Device[]
}