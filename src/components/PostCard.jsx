import React, { useState } from "react";
import appwriteService from "../app/conf";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage, content }) => {
  const [imageError, setImageError] = useState(false);
  
  const truncateContent = (text, maxLength = 100) => {
    if (!text) return "";
    const plainText = text.replace(/<[^>]*>/g, "");
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="bg-[#232336]/70 border border-indigo-700 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col items-start h-full z-10">
        <div className="w-full flex justify-center mb-4">
          {featuredImage && !imageError ? (
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="rounded-xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded-xl text-gray-400 text-lg">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-indigo-400 transition-colors duration-200">{title}</h2>
        {content && (
          <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
            {truncateContent(content)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default PostCard;