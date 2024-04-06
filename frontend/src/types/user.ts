import { Office } from "./office";

export interface User {
    id: number,
    email: string,
    username: string,
    offices: Office[]
}