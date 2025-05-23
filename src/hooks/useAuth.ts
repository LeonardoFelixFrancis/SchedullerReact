import { loginService, registerService } from "@/services/auth";
import type LoginData from "@/models/login";
import type RegisterData from "@/models/register";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const navigate = useNavigate();

    const login = async (data: LoginData) => {
        const response = await loginService(data);
        const user_data = response.data.user_data;
        if (response.status === 200){
            localStorage.setItem('user', JSON.stringify({username: user_data.username, name: user_data.name, email: user_data.email, id: user_data.id}));
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }



    return {login, logout, userRegister}
}