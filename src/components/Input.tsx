import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    registerProps?: ReturnType<any>;
    error?: string;
}

export default function Input({
    label,
    name,
    registerProps,
    error,
    ...props
}: TextInputProps) {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input 
                id={name}
                name={name}
                className={`mt-1 block w-full px-4 py-2 border rounded ${
                    error ? "border-red-500" : ""
                }`}
                {...registerProps}
                {...props}
            />
            {error && (
                <p className='text-red-500 text-sm mt-1'>{error}</p>
            )}
        </div>
    );
}