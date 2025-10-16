import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashBoard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';

export default function App() {
  return (
    <div clssName="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </div>
  );
}