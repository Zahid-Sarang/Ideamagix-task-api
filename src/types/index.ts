import { Request } from "express";

export interface UserData {
    userName: string;
    email: string;
    password: string;
    role: string;
}
export interface RegisterUserRequest extends Request {
    body: UserData;
}
