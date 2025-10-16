import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";

export default function CreatePost() {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ title: "", body: "" });
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      api.get(`/posts/${postId}`).then((res) => setForm(res.data));
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (postId) {
      await api.put(`/posts/${postId}`, form, config);
      alert("Post updated!");
    } else {
      await api.post("/posts", form, config);
      alert("Post created!");
    }
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {postId ? "Edit Post" : "Create New Post"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded mb-3"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Write your post here..."
          className="w-full border p-2 rounded mb-3 h-40"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        ></textarea>
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          {postId ? "Update" : "Publish"}
        </button>
      </form>
    </div>
  );
}
