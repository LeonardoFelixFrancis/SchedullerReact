import { loginService, registerService, refreshService } from "@/services/auth";
import { useState, useEffect } from "react";
import useUserStore from "@/store/useLoggedUserStore";
import type LoginData from "@/models/login";
import type RegisterData from "@/models/register";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

export default function useAuth() {
    const { setUser } = useUserStore();

    const navigate = useNavigate();

    const login = async (data: LoginData) => {
        const response = await loginService(data);
        const user_data = response.data.user_data;
        if (response.status === 200){
            setUser({username: user_data.username, name: user_data.name, email: user_data.email, id: user_data.id, })
        }

        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        navigate('/home')
    }

    const userRegister = async (data: RegisterData) => {
        const response = await registerService(data);
        
        if (response.status === 200){
            navigate('/');
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }



    return {login, logout, userRegister}
}