import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ForgotPasswordFormData = {
    email: string;
}

export default function ForgotPassword() {
    const { userForgotPassword }  = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        mode: 'onSubmit'
    });

    const navigate = useNavigate();

    const onSubmit = async (data: ForgotPasswordFormData) => {
        await userForgotPassword(data.email);
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='max-w-md w-full bg-white p-8 rounded shadow'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Recuperar Senha</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                        <input className={`mt-1 block w-full px-4 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            {
                            ...register('email', {
                                required: 'Email is required', pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                            },
                            )
                            }
                        />
                        {errors.email && (
                            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                        )}
                    </div>

                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded mb-1'>
                        Enviar
                    </button>

                    <p onClick={() => navigate('/')} className='text-blue-500 text-center hover:text-blue-800 hover:cursor-pointer'>Cancelar</p>

                </form>
            </div>
        </div>
    )

}