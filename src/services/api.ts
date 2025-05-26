import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
  response => response, // Para respostas bem-sucedidas
  error => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(`Erro: ${error.response.data.detail || 'Algo deu errado'}`);
      } else if (error.request) {
        toast.error('Erro: Nenhuma resposta do servidor');
      } else {
        toast.error(`Erro inesperado: ${error.message}`);
      }
    } else {
      toast.error('Erro inesperado.');
    }
    return Promise.reject(error);
  }
);

export default api;