export interface UserData {
    id?: number;
    username: string;
    name: string;
    email: string;
}

export interface UserResponse {
    id: number;
    username: string;
    name: string;
    email: string;
}

export interface UserFilter {
    id?: number | null;
    username?: string | null;
    email?: string | null;
    name?: string | null;
}