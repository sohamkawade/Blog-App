import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../app/conf";
import { Query } from "appwrite";
import { Container } from "../components";
import { LogoutButton } from "../components";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Profile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) return;
    setLoading(true);
    setError(null);
    appwriteService
      .getPosts([
        Query.equal("userId", userData.$id),
        Query.equal("status", "active"),
      ])
      .then((result) => {
        if (result && result.documents) {
          setPosts(result.documents);
        } else {
          setPosts([]);
        }
      })
      .catch(() => setError("Failed to load your posts"))
      .finally(() => setLoading(false));
  }, [userData]);

  return (
    <div className="min-h-[60vh] py-8 px-2 sm:px-0 w-full bg-transparent">
      <Container>
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-gray-300" size={90} />
          <h2 className="text-2xl font-bold text-white mt-4">
            {userData?.name || "User"}
          </h2>
          <p className="text-gray-400 mt-1">{userData?.email}</p>
          <div className="mt-2 text-indigo-400 font-semibold">
            {posts.length} Posts
          </div>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[30vh]">
            <span className="text-lg text-indigo-400 animate-pulse">
              Loading your posts...
            </span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[30vh]">
            <span className="text-lg text-red-400">{error}</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
            <span className="text-4xl mb-2">📭</span>
            <span className="text-lg text-gray-400 mb-4">
              You haven't posted anything yet.
            </span>
            <Link
              to="/add-post"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition text-base mt-2 shadow-lg"
            >
              Add Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {posts.map((post) => {
              const likeCount =
                Number(localStorage.getItem(`likeCount_${post.$id}`)) || 0;
              return (
                <div
                  key={post.$id}
                  className="bg-[#232336]/80 border border-indigo-800 rounded-xl overflow-hidden shadow-md flex flex-col group relative"
                >
                  {post.featuredImage ? (
                    <img
                      src={appwriteService.getFileView(post.featuredImage)}
                      alt={post.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-800 text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-semibold text-white truncate flex-1">
                        {post.title}
                      </h3>
                      <span className="flex items-center gap-1 ml-2 text-xs text-pink-400">
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {likeCount}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 flex-1 truncate">
                      {post.content?.replace(/<[^>]*>/g, "").slice(0, 60)}
                      {post.content && post.content.length > 60 ? "..." : ""}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <Link
                        to={`/post/${post.$id}`}
                        className="text-indigo-400 hover:text-indigo-300 text-xs font-medium"
                      >
                        Read More
                      </Link>
                      {userData?.$id === post.userId && (
                        <div className="flex gap-2">
                          <button
                            title="Edit"
                            className="p-1 cursor-pointer rounded hover:bg-indigo-700 text-indigo-400 hover:text-white transition"
                            onClick={() => navigate(`/edit-post/${post.$id}`)}
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            title="Delete"
                            className="p-1 cursor-pointer rounded hover:bg-red-700 text-red-400 hover:text-white transition"
                            onClick={async () => {
                              await appwriteService.deletePost(post.$id);
                              if (post.featuredImage)
                                await appwriteService.deleteFile(
                                  post.featuredImage
                                );
                              setPosts((prev) =>
                                prev.filter((p) => p.$id !== post.$id)
                              );
                            }}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profile;
