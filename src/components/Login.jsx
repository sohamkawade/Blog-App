import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../app/auth";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await authService.login(data);
      if (res) navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-black rounded-xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 animate-fade-in shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6] text-center mb-2">Login</h2>
        <div className="flex flex-col gap-2">
          <label className="text-[#A1A1AA] font-medium text-sm sm:text-base">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="bg-[#18181B] text-[#F3F4F6] rounded-lg px-4 py-2 border border-[#232336] focus:ring-2 focus:ring-[#3B82F6] outline-none transition w-full text-sm sm:text-base"
            autoComplete="email"
          />
          {errors.email && <span className="text-red-500 text-xs sm:text-sm">Email is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#A1A1AA] font-medium text-sm sm:text-base">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="bg-[#18181B] text-[#F3F4F6] rounded-lg px-4 py-2 border border-[#232336] focus:ring-2 focus:ring-[#3B82F6] outline-none transition w-full text-sm sm:text-base"
            autoComplete="current-password"
          />
          {errors.password && <span className="text-red-500 text-xs sm:text-sm">Password is required</span>}
        </div>
        {error && <div className="text-red-500 bg-red-900/20 rounded-lg px-4 py-2 text-center animate-fade-in text-xs sm:text-sm">{error}</div>}
        <button
          type="submit"
          className="mt-2 bg-blue-600 cursor-pointer text-white font-semibold py-2 rounded-lg w-full hover:scale-105 focus:ring-2 outline-none transition-all duration-200 text-base sm:text-lg"
        >
          Login
        </button>
        <p className="text-[#A1A1AA] text-center mt-2 text-xs sm:text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#3B82F6] hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
