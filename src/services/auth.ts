import api from "./api";
import type RegisterData from '@/models/register';
import type LoginData from "@/models/login";
import type ResetPasswordData from "@/models/reset_password";

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

export const resetPasswordService = async (data: ResetPasswordData, token: string) => {
    const response = await api.post(`/auth/reset_password/${token}`, data);
    return response
}

export const forgotPasswordService = async (email: string) => {
    const response = await api.post('/auth/forgot_password', {email});
    return response;
}
