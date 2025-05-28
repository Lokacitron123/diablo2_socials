"use client";

import { loginUser } from "@/actions/auth";
import { LoginValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>();

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    setServerError(null);

    const result = await loginUser(data);

    if (result.error) {
      setServerError(result.error);
    } else if (result.user) {
      reset();

      redirect("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
      {/* Email */}
      <div className='flex flex-col gap-0.5'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Enter an email...'
          {...register("email", { required: "Email is required" })}
          className='border p-2 rounded'
        />
        {errors.email && (
          <span className='text-red-500 text-sm'>{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className='flex flex-col gap-0.5'>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          placeholder='Enter a password...'
          {...register("password", { required: "Password is required" })}
          className='border p-2 rounded'
        />
        {errors.password && (
          <span className='text-red-500 text-sm'>
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Server error message */}
      {serverError && (
        <div className='text-red-600 text-sm text-center'>{serverError}</div>
      )}

      {/* Submit */}
      <button
        type='submit'
        disabled={isSubmitting}
        className={`p-2 w-full rounded text-white transition
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--accent)] hover:opacity-90"
            }
          `}
      >
        {isSubmitting ? "Submitting..." : "Login"}
      </button>
    </form>
  );
};
