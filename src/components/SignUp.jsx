import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../app/auth";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await authService.createAccount(data);
      if (res) navigate("/login");
    } catch (err) {
      setError(err?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-20 w-full max-w-xs sm:max-w-sm md:max-w-md bg-black rounded-xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 animate-fade-in shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6] text-center mb-2">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <label className="text-[#A1A1AA] font-medium text-sm sm:text-base">Full Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="bg-[#18181B] text-[#F3F4F6] rounded-lg px-4 py-2 border border-[#232336] focus:ring-2 focus:ring-[#6366F1] outline-none transition w-full text-sm sm:text-base"
            autoComplete="name"
          />
          {errors.name && <span className="text-red-500 text-xs sm:text-sm">Name is required</span>}
        </div>
        {error && <div className="text-red-500 bg-red-900/20 rounded-lg px-4 py-2 text-center animate-fade-in text-xs sm:text-sm">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-[#A1A1AA] font-medium text-sm sm:text-base">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="bg-[#18181B] text-[#F3F4F6] rounded-lg px-4 py-2 border border-[#232336] focus:ring-2 focus:ring-[#6366F1] outline-none transition w-full text-sm sm:text-base"
            autoComplete="email"
          />
          {errors.email && <span className="text-red-500 text-xs sm:text-sm">Email is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#A1A1AA] font-medium text-sm sm:text-base">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="bg-[#18181B] text-[#F3F4F6] rounded-lg px-4 py-2 border border-[#232336] focus:ring-2 focus:ring-[#6366F1] outline-none transition w-full text-sm sm:text-base"
            autoComplete="new-password"
          />
          {errors.password && <span className="text-red-500 text-xs sm:text-sm">Password must be at least 6 characters</span>}
        </div>
        <button
          type="submit"
          className="mt-2 cursor-pointer bg-blue-600 text-white font-semibold py-2 rounded-lg w-full hover:scale-105 focus:ring-2 outline-none transition-all duration-200 text-base sm:text-lg"
        >
          Sign Up
        </button>
        <p className="text-[#A1A1AA] text-center mt-2 text-xs sm:text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-[#6366F1] hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
