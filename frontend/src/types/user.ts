<<<<<<< HEAD
import { Office } from "./space";
=======
import {Space} from "./space.ts";
>>>>>>> main

export interface User {
    id: number,
    email: string,
    username: string,
    spaces?: Space[]
}