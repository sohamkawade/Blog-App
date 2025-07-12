import React, { useState } from "react";
import appwriteService from "../app/conf";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="card bg-[#18181B] rounded-2xl shadow-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex flex-col items-start group cursor-pointer h-full">
        <div className="w-full flex justify-center mb-4">
          {featuredImage && !imageError ? (
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="rounded-xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-xl text-gray-400 text-lg">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-blue-600 transition-colors duration-200">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
