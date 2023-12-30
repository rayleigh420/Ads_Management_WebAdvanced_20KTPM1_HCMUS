import React from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log('Form data:', data);
        // Handle form submission logic here
    };

    return (
        <div className="relative flex flex-col justify-center min-h-[600px] overflow-hidden w-full">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-blue-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700 underline uppercase decoration-wavy">
                    Sign in
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a href="#" className="text-xs text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

