export interface UserData {
    username: string;
    name: string;
    email: string;
}

export interface UserFilter {
    id?: number | null;
    username?: string | null;
    email?: string | null;
    name?: string | null;
    company_id: number | null;
}