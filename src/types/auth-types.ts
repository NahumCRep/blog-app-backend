import { userRoles } from "../constants/roles";

export type TUserRole = typeof userRoles[keyof typeof userRoles];

export interface IRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: TUserRole;
}

export interface ICredentials {
    email: string;
    password: string;
}

export interface IUserToken {
    id: number;
    email: string;
    role: TUserRole;
}
