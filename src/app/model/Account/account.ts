import { Role } from "../Request/role";

export interface Account {
    accountId: number;
    username: string;
    password: string;
    email: string;
    isEnable: boolean;
    roles: Role[];
}