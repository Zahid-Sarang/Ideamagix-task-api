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

export type AuthCookie = {
    accessToken: string;
    refreshToken: string;
};

export interface AuthRequest extends Request {
    auth: {
        sub: string;
        role: string;
        id?: string;
    };
}

export interface IRefreshTokenPayload {
    id: string;
}

export interface IUserDto {
    _id: string;
    userName: string;
    email: string;
    role: string;
    activated: boolean;
    createdAt: Date;
    [key: string]: unknown; // Allow additional properties
}

export interface CourseData {
    name: string;
    level: string;
    description: string;
    filePath: string;
}

export interface CourseRegisterRequest extends Request {
    body: CourseData;
}

export interface LectureData {
    date: string;
    instructor: string;
    course: string;
}

export interface LectureRegisterRequest extends Request {
    body: LectureData;
}
