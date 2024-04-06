import { Office } from "./space";

export interface User {
    id: number,
    email: string,
    username: string,
    offices: Office[]
}