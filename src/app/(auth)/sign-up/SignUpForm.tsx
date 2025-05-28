"use client";

import { registerUser } from "@/actions/auth";
import { SignUpFormValues, SignUpValues } from "@/lib/validation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpFormValues>(); // SignUpFormValues sets state for the form

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // SignUpValues states what is to be submitted
  const onSubmit: SubmitHandler<SignUpValues> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);

    const result = await registerUser(data);

    if (result.error) {
      setServerError(result.error);
    } else if (result.user) {
      setSuccessMessage("Account created successfully!");
      reset(); // reset the form
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
      {/* Username */}
      <div className='flex flex-col gap-0.5'>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          placeholder='Enter a username...'
          {...register("username", { required: "Username is required" })}
          className='border p-2 rounded'
        />
        {errors.username && (
          <span className='text-red-500 text-sm'>
            {errors.username.message}
          </span>
        )}
      </div>

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

      {/* Repeat Password */}
      <div className='flex flex-col gap-0.5'>
        <label htmlFor='repeatPassword'>Repeat Password</label>
        <input
          id='repeatPassword'
          type='password'
          placeholder='Repeat the password...'
          {...register("repeatPassword", {
            required: "Please repeat your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className='border p-2 rounded'
        />
        {errors.repeatPassword && (
          <span className='text-red-500 text-sm'>
            {errors.repeatPassword.message}
          </span>
        )}
      </div>

      {/* Server error message */}
      {serverError && (
        <div className='text-red-600 text-sm text-center'>{serverError}</div>
      )}

      {/* Success message */}
      {isSubmitSuccessful && successMessage && (
        <div className='text-green-600 text-sm text-center'>
          {successMessage}
        </div>
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
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};
