import { useEffect, useState } from "react";
import "./views/Home.css";
import "./components/index";
import { useDispatch } from "react-redux";
import authService from "./app/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const renderStars = (count = 60) => {
  const colors = [
    "#00f0ff",
    "#a300ff",
    "#ff00c8",
    "#00ffc3",
    "#89faff",
    "#ffd700",
  ];
  const stars = [];

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 1.5 + 0.5;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 12 + Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];

    stars.push(
      <div
        key={i}
        className="galaxy-star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}, 0 0 12px ${color}, 0 0 20px ${color}`,
        }}
      />
    );
  }

  return stars;
};

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [location]);

  return !loading ? (
    <div className="min-h-screen flex flex-col relative">
      <div className="galaxy-bg fixed inset-0 pointer-events-none z-0">
        {renderStars(60)}
      </div>
      <Header />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;