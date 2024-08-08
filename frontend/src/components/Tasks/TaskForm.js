import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import axiosInstance from './../Auth/axiosInstance';
import './TaskForm.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [error, setError] = useState('');

  const { taskId } = useParams();

  useEffect(() => {
    if (taskId) {
      axiosInstance.get(`http://localhost:5000/api/tasks/${taskId}`).then(({ data }) => {
        const formattedDate = data.due_date.substring(0,data.due_date.length-1);
        setTitle(data.title);
        setDescription(data.description);
        setDueDate(formattedDate);
        setStatus(data.status);
        setPriority(data.priority);
        setCategory(data.category);
        setAssignedTo(data.assigned_user_id);
      });
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await axiosInstance.put(`http://localhost:5000/api/tasks/${taskId}`, { title, description, due_date: dueDate, status, priority, category, assigned_user_id: assignedTo });
        window.alert("Task Updated Successfully.")
        window.location.href = '/tasks';
      } else {
        await axiosInstance.post('http://localhost:5000/api/tasks', { title, description, due_date: dueDate, status, priority, category, assigned_user_id: assignedTo });
        window.alert("Task Added Successfully.")
      }

    } catch (err) {
      setError('Error saving task');
    }
  };

  return (
    <div className="task-form-container">
      <h2>{taskId ? 'Update Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title' >Task Title:</label>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor='description' >Description:</label>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor='dueDate' >due date for completion:</label>
        <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <label htmlFor='status' >Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label htmlFor='priority' >Priority: </label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label htmlFor='Category' >Task Category:</label>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <label htmlFor='assignedTo' >Task Assigned To: (User ID)</label>
        <input type="text" placeholder="Assigned To (User ID)" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        <button type="submit">{taskId ? 'Update Task' : 'Add Task'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default TaskForm;
