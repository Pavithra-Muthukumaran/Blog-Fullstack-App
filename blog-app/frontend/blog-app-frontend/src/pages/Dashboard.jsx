import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (token) {
      api
        .get("/posts/my", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setPosts(res.data));
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter((p) => p._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Posts</h1>
      <div className="space-y-3">
        {posts.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-lg shadow p-4 flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-gray-600">{p.body.slice(0, 60)}...</p>
            </div>
            <div className="space-x-2">
              <Link
                to={`/posts/${p._id}`}
                className="text-blue-600 underline"
              >
                View
              </Link>
              <Link
                to={`/create?id=${p._id}`}
                className="text-green-600 underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
