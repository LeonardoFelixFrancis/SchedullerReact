import api from "./api";
import type { UserData, UserFilter } from "@/models/user";

export const userCreateService = async (data: UserData) => {
    const response = await api.post('/users', data);
    return response;
}

export const userListService = async (filter: UserFilter) => {
    console.log('filters', filter)
    const response = await api.get('/users', {params: {...filter}});
    return response;
}

export const userGetService = async (user_id: number) => {
    const response = await api.get(`/users/${user_id}`);
    return response;
}

export const userDeleteService = async (teacher_id: number) => {
    const response = await api.delete(`/users/teacher/${teacher_id}`);
    return response;
}