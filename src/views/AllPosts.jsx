import React, { useEffect, useState } from "react";
import appwriteService from "../app/conf";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = useSelector((state) => state.auth.userData);

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
  }, [userData]); 

  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center items-center bg-[#18181B] min-h-[60vh]">
        <span className="text-2xl font-semibold text-[#6366F1] animate-pulse">Loading posts...</span>
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
      <div className="w-full py-16 flex justify-center items-center bg-[#18181B] min-h-[60vh]">
        <span className="text-2xl font-semibold text-[#A1A1AA]">No posts available</span>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12 bg-[#18181B] min-h-[60vh] px-2 sm:px-0">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] mb-6 sm:mb-8">All Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;