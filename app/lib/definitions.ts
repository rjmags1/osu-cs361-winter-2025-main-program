import { User } from "next-auth";

export interface _User extends User {
    username: string;
    password: string;
}
