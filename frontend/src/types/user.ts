import {Space} from "./space.ts";

export interface User {
    id: number,
    email: string,
    username: string,
    spaces?: Space[]
}