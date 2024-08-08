import React, { useState, useEffect } from 'react';
import axiosInstance from './../Auth/axiosInstance';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ title: '', status: '', category: '' });

  useEffect(() => {
    axiosInstance.get('http://localhost:5000/api/tasks').then(({ data }) => setTasks(data));
  }, []);

  const handleDelete = async (id) => {
    await axiosInstance.delete(`http://localhost:5000/api/tasks/${id}`);
    window.alert("Task deleted successfully.")
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Tasks</h2>
      <div className="filters">
        <input
          className="filter-input"
          type="text"
          placeholder="Filter by title"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
        />
        <select
          className="filter-select"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          className="filter-input"
          type="text"
          placeholder="Filter by category"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />
      </div>
      <ul className="task-list">
        {tasks
          .filter(task =>
            (!filter.title || task.title.includes(filter.title)) &&
            (!filter.status || task.status === filter.status) &&
            (!filter.category || task.category === filter.category)
          )
          .map(task => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <table><tbody>
              <tr>
                <td><p className={`task-status ${task.status}`}>{task.status}</p></td>
                <td id="right-item"><p><strong>Completed by: </strong> {task.due_date}</p></td>
              </tr>
              <tr>
                <td><p><strong>priority: </strong> {task.priority}</p></td>
                <td id="right-item"><p><strong>Category: </strong>{task.category}</p></td>
              </tr>
              <tr>
                <td><p><strong>Created By: </strong> {task.created_user_id}</p></td>
                <td id="right-item"><p><strong>assignedTo: </strong> {task.assigned_user_id}</p></td>
              </tr>
              <tr>
                <td><p><strong>Created at: </strong> {task.createdAt}</p></td>
                <td id="right-item"><p><strong>Updated at: </strong> {task.updatedAt}</p></td>
              </tr>
              </tbody></table>
              <div className="task-footer">
                <button onClick={() => window.location.href = `/tasks/update/${task.id}`}>Update</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
