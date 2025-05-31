import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

type ResetPassowrdForm = {
    password: string;
    confirm_password: string
}

export default function ResetPassword() {
    const { token } = useParams();
    const { userResetPassword } = useAuth();

    const navigate = useNavigate();

    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<ResetPassowrdForm>({
            mode: 'onSubmit'
        });

    const onSubmit = async (data: ResetPassowrdForm) => {
        await userResetPassword(data, token!);
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='max-w-md w-full bg-white p-8 rounded shadow'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Alterar Senha</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Senha</label>
                        <input type="password" className={`mt-1 block w-full px-4 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            {
                            ...register('password', {
                                required: 'A senha é um campo obrigatório'
                            },
                            )
                            }
                        />
                        {errors.password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Confirmar Senha</label>
                        <input type="password"
                            className={`mt-1 block w-full px-4 py-2 border rounded ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...register('confirm_password', {
                                required: 'confirm_password is required',
                                minLength: {
                                    value: 6,
                                    message: 'confirm_password must be at least 6 characters',
                                },
                            })}
                        />
                        {errors.confirm_password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.confirm_password.message}</p>
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