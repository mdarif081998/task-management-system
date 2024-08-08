import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      {isLoggedIn ? (
        <>
          <Link to="/tasks">Tasks</Link>
          <Link to="/tasks/add">Add Task</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/help">Help</Link>
          <button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            window.location.href = '/login';
          }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/help">Help</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
