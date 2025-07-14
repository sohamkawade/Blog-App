import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../app/auth";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.username, 
      });
      if (res) navigate("/login");
    } catch (err) {
      setError(err?.message || "Signup failed");
    }
  };

  return (
    <div className="p-12 flex items-center justify-center px-2 sm:px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative border border-gray-800 z-20 w-full max-w-xs sm:max-w-sm md:max-w-md bg-black rounded-xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 animate-fade-in shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6] text-center mb-2">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <Input
            label="Username"
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters" },
              pattern: {
                value: /^[a-zA-Z0-9_.-]+$/,
                message: "Only letters, numbers, underscores, dots, and hyphens allowed"
              }
            })}
            autoComplete="username"
          />
          {errors.username && <span className="text-red-500 text-xs sm:text-sm">{errors.username.message}</span>}
        </div>
        {error && <div className="text-red-500 bg-red-900/20 rounded-lg px-4 py-2 text-center animate-fade-in text-xs sm:text-sm">{error}</div>}
        <div className="flex flex-col gap-2">
          <Input
            label="Email"
            type="email"
            {...register("email", { required: true })}
            autoComplete="email"
          />
          {errors.email && <span className="text-red-500 text-xs sm:text-sm">Email is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#A1A1AA] font-medium text-sm sm:text-base">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              autoComplete="new-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A1A1AA] hover:text-[#F3F4F6] transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <span className="text-red-500 text-xs sm:text-sm">Password must be at least 6 characters</span>}
        </div>
        <Button
          type="submit"
          bgColor="bg-blue-600"
          className="mt-2 w-full text-base sm:text-lg"
        >
          Sign Up
        </Button>
        <p className="text-[#A1A1AA] text-center mt-2 text-xs sm:text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#6366F1] hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
