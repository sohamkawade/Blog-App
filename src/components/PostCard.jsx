import React, { useEffect, useState } from "react";
import appwriteService from "../app/conf";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const PostCard = ({
  $id,
  title,
  featuredImage,
  content,
  username,
  $createdAt,
}) => {
  const [imageError, setImageError] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const userId = userData?.$id;
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false); 

  useEffect(() => {
    appwriteService.getPost($id).then(post => {
      setLikeCount(post.likes || 0);
      setIsLiked(post.likedby?.includes(userId));
    });
  }, [$id, userId]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      alert("You must be logged in to like posts.");
      return;
    }
    setIsLiking(true);
    try {
      let updated;
      if (!isLiked) {
        updated = await appwriteService.likePost($id, userId);
      } else {
        updated = await appwriteService.unlikePost($id, userId);
      }
      setLikeCount(updated.likes);
      setIsLiked(updated.likedby.includes(userId));
    } catch (err) {
      alert("Failed to update like.");
    }
    setIsLiking(false);
  };

  const truncateContent = (text, maxLength = 100) => {
    if (!text) return "";
    const plainText = text.replace(/<[^>]*>/g, "");
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  const isContentTruncated = (text, maxLength = 100) => {
    if (!text) return false;
    const plainText = text.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength;
  };

  return (
    <div className="bg-[#232336]/70 border border-indigo-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-3 flex flex-col items-start h-full z-10">
      <div className="flex items-center mb-2 w-full">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-800 text-gray-100 text-base mr-2">
          <FaUserCircle className="w-4 h-4" />
        </span>
        <span className="font-semibold text-gray-100 text-sm">
          {username || "User"}
        </span>
      </div>

      <div className="w-full flex justify-center mb-2">
        {featuredImage && !imageError ? (
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-40 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-gray-800 rounded-xl text-gray-400 text-base">
            No Image
          </div>
        )}
      </div>

      <div className="w-full flex justify-between items-start mb-1">
        <h2 className="text-lg font-bold text-blue-500 flex-1">{title}</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={handleLikeClick}
            className="ml-2 p-1 hover:scale-110 transition-transform duration-200 focus:outline-none"
            title={isLiked ? "Unlike" : "Like"}
            disabled={isLiking}
          >
            <svg
              className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${isLiked ? "text-red-600 fill-current" : "text-gray-400"}`}
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <span className="text-xs text-gray-400 select-none">{likeCount}</span>
        </div>
      </div>

      {content && (
        <div className="w-full">
          <p className="text-xs text-gray-300 leading-relaxed mb-1">
            {truncateContent(content)}
          </p>

          {(isContentTruncated(content) || $createdAt) && (
            <div className="flex justify-between items-center w-full text-xs mt-1">
              {isContentTruncated(content) && (
                <Link
                  to={`/post/${$id}`}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 cursor-pointer font-medium"
                >
                  Read More
                </Link>
              )}
              {$createdAt && (
                <span className="text-gray-500">
                  {new Date($createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
