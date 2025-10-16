import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-3">
        {post.body.substring(0, 100)}...
      </p>
      <Link
        to={`/posts/${post._id}`}
        className="text-blue-500 hover:underline"
      >
        Read more →
      </Link>
    </div>
  );
}
