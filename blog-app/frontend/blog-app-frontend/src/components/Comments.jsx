import React, { useEffect, useState } from "react";
import api from "../api";

export default function Comments({ postId, token }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = () => {
    api.get(`/comments/${postId}`).then((res) => setComments(res.data));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to comment.");
      return;
    }

    await api.post(
      "/comments",
      { postId, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    fetchComments();
  };

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="text-xl font-semibold mb-3">Comments</h3>

      {comments.length === 0 && (
        <p className="text-gray-600">No comments yet. Be the first!</p>
      )}

      <ul className="space-y-3 mb-4">
        {comments.map((c) => (
          <li key={c._id} className="bg-gray-100 p-3 rounded-lg">
            <p className="text-gray-800">{c.text}</p>
            <span className="text-sm text-gray-500">
              — {c.user?.name || "Anonymous"}
            </span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd}>
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}
