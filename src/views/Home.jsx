import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../app/conf";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    console.log("Home: Loading posts, userData:", userData ? "User logged in" : "No user");
    setLoading(true);
    setError(null);
    appwriteService
      .getPosts()
      .then((posts) => {
        console.log("Home: Posts received:", posts);
        if (posts) {
          const sortedPosts = [...posts.documents].sort(
            (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
          );
          console.log("Home: Sorted posts:", sortedPosts.length);
          setPosts(sortedPosts);
        }
      })
      .catch((err) => {
        console.error("Home: Error loading posts:", err);
        setError("Failed to load posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userData]);

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

  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden">
      <div className="galaxy-bg">{renderStars(60)}</div>
      {!userData && (
        <div className="relative z-10 text-center px-6 pt-8 pb-20 sm:pt-12 sm:pb-28 max-w-3xl mx-auto">
          {!loading && !error && posts.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center text-center px-6 animate-fade-in">
              <div className="max-w-xl mx-auto space-y-6">
                <div className="text-7xl animate-bounce">👋</div>
              </div>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 mt-2">
            Welcome to Our Galaxy Blog ✨
          </h1>
          <p className="text-indigo-200 text-lg mb-8">
            Explore AI-driven content, futuristic design, and real-time
            collaboration in one platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-indigo-400 text-indigo-400 px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}

      {!userData && (
        <section className="relative z-10 px-4 md:px-8 lg:px-16 py-16 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-10">
            Why Start Your Blog Here?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
            <div className="bg-[#1e1e2f]/80 backdrop-blur-sm p-6 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg border border-indigo-700">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Easy Publishing</h3>
              <p className="text-indigo-200 text-sm">
                Write and share your thoughts effortlessly with our clean and
                intuitive editor.
              </p>
            </div>
            <div className="bg-[#1e1e2f]/80 backdrop-blur-sm p-6 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg border border-pink-600">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Audience</h3>
              <p className="text-indigo-200 text-sm">
                Reach more readers with built-in SEO tools and beautiful content
                layouts.
              </p>
            </div>
            <div className="bg-[#1e1e2f]/80 backdrop-blur-sm p-6 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg border border-cyan-500">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Reader Engagement</h3>
              <p className="text-indigo-200 text-sm">
                Enable comments and feedback to connect with your readers
                directly and build community.
              </p>
            </div>
          </div>
        </section>
      )}

      {loading && (
        <div className="w-full py-16 flex justify-center items-center min-h-[60vh]">
          <span className="text-2xl font-semibold text-[#6366F1] animate-pulse">
            Loading posts...
          </span>
        </div>
      )}
      {!loading && error && (
        <div className="w-full py-16 flex justify-center items-center min-h-[60vh]">
          <span className="text-2xl font-semibold text-red-500">{error}</span>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center text-center px-6 animate-fade-in py-16 z-10 relative">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-7xl animate-bounce">🚀</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-2">No posts yet</h2>
            <p className="text-indigo-200 text-lg mb-6">Be the first to add content to the blog!</p>
            <Link
              to="/add-post"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Add Post
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="py-8 sm:py-12 px-2 sm:px-0 z-10 relative">
          <Container>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] mb-6 sm:mb-8">
              Latest Posts
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Home;
