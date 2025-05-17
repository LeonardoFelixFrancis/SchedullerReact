import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type RegisterFormData = {
    username: string;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    company_name: string;
}

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        mode: 'onSubmit'
    })

    const navigate = useNavigate();
    const password = watch('password');

    const onSubmit = (data: RegisterFormData) => {
        console.log('data', data);
        navigate('/');
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='max-w-md w-full bg-white p-8 rounded- shadow'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Usename</label>
                        <input className={`mt-1 block w-full px-4 py-2 border rounded ${errors.username ? 'border-red-500': 'border-gray-300'}`}
                        {
                            ...register('username', {
                                required: 'Username is required'
                            })
                        } />
                        {errors.username && (
                            <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Name</label>
                        <input className={`mt-1 block w-full px-4 py-2 border rounded ${errors.username ? 'border-red-500': 'border-gray-300'}`}
                        {
                            ...register('name', {
                                required: 'Name is required'
                            })
                        } />
                        {errors.name && (
                            <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>E-mail</label>
                        <input className={`mt-1 block w-full px-4 py-2 border rounded ${errors.username ? 'border-red-500': 'border-gray-300'}`}
                        {
                            ...register('email', {
                                required: 'E-mail is required', pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                            })
                        } />
                        {errors.email && (
                            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type='password' className={`mt-1 block w-full px-4 py-2 border rounded ${errors.username ? 'border-red-500': 'border-gray-300'}`}
                        {
                            ...register('password', {
                                required: 'Password is required'
                            })
                        } />
                        {errors.password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                        )}
                    </div>
                     <div>
                        <label className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        <input type='password' className={`mt-1 block w-full px-4 py-2 border rounded ${errors.username ? 'border-red-500': 'border-gray-300'}`}
                        {
                            ...register('confirm_password', {
                                required: 'Confirm password is required',
                                validate: (value) => value === password || 'Passwords do not match',
                            })
                        } />
                        {errors.confirm_password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.confirm_password.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Company Name</label>
                        <input className={`mt-1 block w-full px-4 py-2 border rounded ${errors.username ? 'border-red-500': 'border-gray-300'}`}
                        {
                            ...register('company_name', {
                                required: 'Company name is required'
                            })
                        } />
                        {errors.company_name && (
                            <p className='text-red-500 text-sm mt-1'>{errors.company_name.message}</p>
                        )}
                    </div>

                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded mb-1'>
                        Sign-Up
                    </button>

                </form>
            </div>
        </div>
    )

}