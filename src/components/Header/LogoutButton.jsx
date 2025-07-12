import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../app/auth";
import { logout } from "../../store/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()));
  };
  return (
    <button
      className="inline-bock px-6 py-2 cursor-pointer text-white duration-200 hover:ring-1 ring-blue-600 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
