import api from "./api";
import type { UserData, UserFilter } from "@/models/user";

export const userCreateService = async (data: UserData) => {
    const response = await api.post('/users', data);
    return response.data;
}

export const userListService = async (filter: UserFilter) => {
    const response = await api.get('/users', {params: {...filter}});
    return response.data;
}

export const userGetService = async (user_id: number) => {
    const response = await api.get(`/users/${user_id}`);
    return response.data;
}