import React, {useContent} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


export default function Navbar() {
  const {token, user, logout} = useContent(AuthContext);
return (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <Link to="/" className="text-xl font-bold"> Blog App </Link>
    <div className='space-x-4'>
        <Link to="/">Home</Link>
        {token ? (
            <>
                <Link to="/create">New Post</Link>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={logout} className="bg-red-500 px-3 py-1 rounded text-sm">Logout</button>
                </>
        ) : (
            <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                </>
                )}
    </div>
    </nav>
);
}