import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

type LoginFormData = {
    email: string;
    password: string;
}

export default function Login() {
    const { login }  = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        mode: 'onSubmit'
    });

    const navigate = useNavigate();

    const onSubmit = (data: LoginFormData) => {
        const { email, password } = data;
        login({email, password});
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='max-w-md w-full bg-white p-8 rounded shadow'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
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

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type="password"
                            className={`mt-1 block w-full px-4 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        {errors.password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                        )}
                    </div>

                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded mb-1'>
                        Sign In
                    </button>

                    <p onClick={() => navigate('/register')} className='text-blue-500 text-center hover:text-blue-800 hover:cursor-pointer'>Sign-Up</p>

                </form>
            </div>
        </div>
    )

}