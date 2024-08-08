import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-container">
      <h2>Help & Support</h2>
      <section>
        <h3>Getting Started</h3>
        <p>Welcome to the Task Management System. Here’s a quick guide to help you get started:</p>
        <ul>
          <li><strong>Register:</strong> Create an account by filling in the registration form.</li>
          <li><strong>Login:</strong> Use your email and password to log in to your account.</li>
          <li><strong>Add Tasks:</strong> Navigate to the "Add Task" page to create a new task.</li>
          <li><strong>View Tasks:</strong> On the "Tasks List" page, you can view, filter, and manage your tasks.</li>
          <li><strong>Update Tasks:</strong> Click on the "Update" button next to a task to edit its details.</li>
          <li><strong>Profile:</strong> Update your profile information on the "Profile" page.</li>
        </ul>
      </section>
      <section>
        <h3>Contact Support</h3>
        <p>If you need further assistance, please reach out to our support team:</p>
        <p>Email: <a href="mailto:mdarifmw98@gmail.com">mdarifmw98@gmail.com</a></p>
        <p>Phone: +91-9019784193 </p>
      </section>
    </div>
  );
};

export default Help;
