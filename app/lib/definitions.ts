import { User } from "next-auth";

export interface _User extends User {
    email: string;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
}
