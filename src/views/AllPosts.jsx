import React, { useEffect, useState } from "react";
import appwriteService from "../app/conf";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./Home.css";

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
          position: "absolute"
        }}
      />
    );
  }
  return stars;
};

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts([])
      .then((posts) => {
        if (posts) {
          const sortedPosts = [...posts.documents].sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
          setPosts(sortedPosts);
        }
      })
      .catch((err) => {
        setError("Failed to load posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userData, location]);

  if (loading) {
    return (
      <div className="relative w-full min-h-[60vh] overflow-hidden">
        <div className="galaxy-bg">{renderStars(60)}</div>
        <div className="w-full py-16 flex justify-center items-center min-h-[60vh] z-10 relative">
          <span className="text-2xl font-semibold text-[#6366F1] animate-pulse">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full min-h-[60vh] overflow-hidden">
        <div className="galaxy-bg">{renderStars(60)}</div>
        <div className="w-full py-16 flex justify-center items-center min-h-[60vh] z-10 relative">
          <span className="text-2xl font-semibold text-red-500">{error}</span>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="relative w-full min-h-[60vh] overflow-hidden">
        <div className="galaxy-bg">{renderStars(60)}</div>
        <div className="w-full py-20 flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-fade-in z-10 relative">
          <span className="text-2xl font-semibold text-[#A1A1AA]">No posts available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[60vh] overflow-hidden">
      <div className="galaxy-bg">{renderStars(60)}</div>
      <div className="py-8 sm:py-12 px-2 sm:px-0 z-10 relative">
        <Container>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] mb-6 sm:mb-8">All Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AllPosts;