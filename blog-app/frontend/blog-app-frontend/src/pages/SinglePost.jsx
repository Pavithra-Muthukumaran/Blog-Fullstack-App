import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import Comments from "../components/Comments";

export default function SinglePost() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">By {post.author?.name}</p>
      <p className="text-gray-800 whitespace-pre-line mb-6">{post.body}</p>

      {/* Comment Section */}
      <Comments postId={post._id} token={token} />
    </div>
  );
}
