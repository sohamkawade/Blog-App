import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../app/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .catch((err) => console.error("Error fetching post:", err));
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) {
    return (
      <div className="py-12 bg-[#18181B] min-h-[60vh] flex items-center justify-center">
        <div className="text-[#F3F4F6] text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#18181B] min-h-[60vh]">
      <Container>
        <div className="max-w-3xl mx-auto bg-black border border-[#2C2C30] rounded-2xl shadow-xl p-6 transition-all duration-300 animate-fade-in">
          <div className="w-full flex justify-center mb-6 rounded-xl overflow-hidden">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full max-h-[360px] object-cover border border-[#2C2C30] hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#F3F4F6] mb-4 text-center">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none text-[#D4D4D8] leading-relaxed text-lg prose-a:text-[#6366F1] prose-a:underline hover:prose-a:text-indigo-400">
            {parse(post.content)}
          </div>

          {isAuthor && (
            <div className="mt-10 flex justify-end gap-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-[#6366F1] text-white hover:bg-transparent hover:text-[#6366F1] border border-[#6366F1]"
                  className="px-4 py-2 rounded-lg"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 text-white hover:bg-transparent hover:text-red-500 border border-red-500"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
