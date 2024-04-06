import { Space } from "./space";

export interface User {
    id: number,
    email: string,
    username: string,
    spaces: Space[]
}