import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';
import UserProfile from './components/Profile/UserProfile';
import Navbar from './components/Navbar';
import Help from './components/Help';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  return (
    
    <Router>
    <Navbar />
    <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/tasks" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/tasks" />} />
          <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/tasks/add" element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/tasks/update/:taskId" element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/help" element={<Help />} />
          <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);
} 

export default App;
