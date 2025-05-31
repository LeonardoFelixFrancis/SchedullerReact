import { loginService, registerService, resetPasswordService, forgotPasswordService } from "@/services/auth";
import type LoginData from "@/models/login";
import type RegisterData from "@/models/register";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type ResetPasswordData from "@/models/reset_password";

export default function useAuth() {
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    const response = await loginService(data);

    if (response.status === 200) {
      const user_data = response.data.user_data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user_data.username,
          name: user_data.name,
          email: user_data.email,
          is_adm: user_data.is_adm,
          id: user_data.id,
        })
      );

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      navigate("/home");
    }
  };

  const userRegister = async (data: RegisterData) => {
    const response = await registerService(data);

    if (response.status === 200) {
      navigate("/");
      toast('Usuário criado com sucesso.')
    }
  };

  const userResetPassword = async (data: ResetPasswordData, token: string) => {
    await resetPasswordService(data, token);
    navigate('/')
    toast('Senha alterada com sucesso.')
  }

  const userForgotPassword = async (email: string) => {
    await forgotPasswordService(email);
    navigate('/')
    toast.success('E-mail de recuperação de senha enviado com sucesso.')
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  };

  return { login, logout, userRegister, userForgotPassword, userResetPassword };
}
