import React, { useEffect, useState } from "react";
import api from "../api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
