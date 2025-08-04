'use client'
import { useLogin } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    login({
      email: data.email,
      password: data.password
    });
  };

  return (
    <section>
      <div className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
        <div className="flex h-full grow flex-col w-full mx-auto px-2 sm:px-5 md:px-20 lg:px-40">
          <div className="flex flex-1 justify-center py-5">
            <form 
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full max-w-[512px] py-5 flex-1 px-4 sm:px-5"
            >
              <h2 className="text-[#111418] tracking-light text-[24px] sm:text-[28px] font-bold leading-tight text-center pb-3 pt-5">
                Welcome to TyFits
              </h2>

              {error && (
                <div className="px-4 py-2 mb-4 text-red-500 text-sm">
                  {(() => {
                    if (
                      typeof error === 'object' &&
                      error !== null &&
                      'response' in error &&
                      (error as any).response?.data?.message
                    ) {
                      return (error as any).response.data.message;
                    }
                    return error.message || 'Login failed. Please try again.';
                  })()}
                </div>
              )}

              <div className="flex flex-wrap items-end gap-4 px-0 sm:px-4 py-3">
                <label className="flex flex-col flex-1 w-full">
                  <input
                    placeholder="Email"
                    type="email"
                    className={`form-input w-full rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] h-14 placeholder:text-[#663399] p-4 text-base font-normal ${
                      errors.email ? '!bg-red-50' : ''
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="flex flex-wrap items-end gap-4 px-0 sm:px-4 py-3">
                <label className="flex flex-col flex-1 w-full">
                  <input
                    placeholder="Password"
                    type="password"
                    className={`form-input w-full rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] h-14 placeholder:text-[#663399] p-4 text-base font-normal ${
                      errors.password ? '!bg-red-50' : ''
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
                    <span className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="flex items-center gap-4 bg-white px-0 sm:px-4 min-h-14 justify-between flex-wrap">
                <p className="text-[#111418] text-base font-normal truncate">
                  Remember me
                </p>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="h-5 w-5 rounded border-[#dbe0e6] border-2 bg-transparent text-[#663399] checked:bg-[#663399] checked:border-[#663399] focus:ring-0 focus:ring-offset-0 focus:border-[#dbe0e6] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex px-0 sm:px-4 py-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#663399] text-white text-base font-bold disabled:opacity-50"
                >
                  <span className="truncate">
                    {isPending ? 'Logging in...' : 'Log in'}
                  </span>
                </button>
              </div>

              <p className="text-[#663399] text-sm font-normal text-center underline pb-3 pt-1 px-4">
                Forgot password?
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
