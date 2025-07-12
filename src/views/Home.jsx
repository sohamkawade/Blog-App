import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../app/conf";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          const sortedPosts = [...posts.documents].sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
          setPosts(sortedPosts);
        }
      })
      .catch(() => {
        setError("Failed to load posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userData]); 

  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center items-center bg-[#18181B] min-h-[60vh]">
        <span className="text-2xl font-semibold text-[#6366F1] animate-pulse">
          Loading posts...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 flex justify-center items-center bg-[#18181B] min-h-[60vh]">
        <span className="text-2xl font-semibold text-red-500">{error}</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center bg-[#18181B] min-h-[60vh] text-center px-6 animate-fade-in">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-7xl animate-bounce">👋</div>
          <h2 className="text-4xl font-extrabold text-[#F3F4F6] animate-fade-down">
            Nothing to see here... yet.
          </h2>
          <p className="text-[#A1A1AA] text-lg animate-fade-up">
            This space is waiting for voices like yours. Whether you want to read, write, or explore—
            it all starts with one click.
          </p>
  
          {!userData && (
            <div className="flex justify-center gap-4 animate-fade-up">
              <Link
                to="/login"
                className="bg-[#6366F1] text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-600 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-[#6366F1] text-[#6366F1] px-6 py-2 rounded-full font-medium hover:bg-[#6366F1] hover:text-white transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  

  return (
    <div className="w-full py-12 bg-[#18181B] min-h-[60vh]">
      <Container>
        <h1 className="text-3xl font-extrabold text-[#F3F4F6] mb-8">
          Latest Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
