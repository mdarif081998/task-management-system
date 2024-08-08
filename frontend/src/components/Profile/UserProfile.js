import React, { useState, useEffect } from 'react';
import axiosInstance from './../Auth/axiosInstance';
// import { bcrypt} from 'bcryptjs';
import './UserProfile.css';
const bcrypt = require('bcryptjs');
const UserProfile = () => {
  const id = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get(`http://localhost:5000/api/users/${id}`)
      .then(({ data }) => setUser(data))
      .catch(err => console.error(err));
  }, []);



  if (!user) return <p>Loading...</p>;

  const handleChangePassword = async (e) => {
    setError('')
    e.preventDefault();
    try {
      if (newPassword  != confirmPassword){
        setError('New password and confirm Password does not match.');        
      } else if(user && await bcrypt.compare(currentPassword, user.password)) {
        const response = await axiosInstance.put(`http://localhost:5000/api/users/${id}`, { password: newPassword });
        window.alert("Password Changed successfully.")
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("")
        setUser(response.data);
    }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Created On:</strong> {user.createdAt}</p>
      <p><strong>Updated On:</strong> {user.updatedAt}</p>
      <div className="auth-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
      <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password" minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password" minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Change Password</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>

  );
};

export default UserProfile;
