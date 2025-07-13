import React, { useState } from "react";
import appwriteService from "../app/conf";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage, content }) => {
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
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
    <Link to={`/post/${$id}`} className="block group">
      <div className="bg-[#232336]/70 border border-indigo-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col items-start h-full z-10">
        <div className="w-full flex justify-center mb-4">
          {featuredImage && !imageError ? (
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="rounded-xl w-full h-48 object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded-xl text-gray-400 text-lg">
              No Image
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-blue-500 flex-1">{title}</h2>
          <button
            onClick={handleLikeClick}
            className="ml-2 p-1 hover:scale-110 transition-transform duration-200 focus:outline-none"
            title={isLiked ? "Unlike" : "Like"}
          >
            <svg
              className={`w-6 h-6 transition-colors duration-200 ${
                isLiked ? "text-red-600 fill-current" : "text-gray-400"
              }`}
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
        </div>
        {content && (
          <div className="w-full">
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              {truncateContent(content)}
            </p>
            {isContentTruncated(content) && (
              <div className="flex justify-end">
                <span className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200 cursor-pointer font-medium">
                  Read More
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostCard;
