import api from "./api";
import type RegisterData from '@/models/register';
import type LoginData from "@/models/login";

export const loginService = async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response;
}

export const refreshService = async (token: string) => {
    const response = await api.post('/auth/refresh', {token});
    return response;
}

export const registerService = async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response
}