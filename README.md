# Task Management System

## Overview

This is a simple task management system with user authentication, Password Change, task categorization, prioritisation, task assignment and automatic Email alerts for pending tasks on dialy basis features.

## Setup

1. Clone the repository.

2. Navigate to the backend directory and run `npm install`.

3. Create a `.env` file and configure your database and JWT settings with follwing evironment variables.
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=task_management
    JWT_SECRET=task-management-system_jwt_secret
    SERVER_PORT=5000
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password

4. Start the backend server with `npm start`.

5. Navigate to the frontend directory and run `npm install`.

6. Start the frontend with `npm start`.


## Project Overview ##

### User Authentication Features

•	User Registration
•	User Login
•	Password Hashing
•	Change Password feature
•	JWT for Authentication

### Task Management Features

•	Create, Read, Update, Delete Operations on Tasks
•	Filter Tasks based on status, priority and category.
•	Assign tasks to users for complteting with due date.
•	Automatic email alerts for pending tasks on dialy basis.
•	Task Fields: id, Title, Description, Due Date, Status, Priority, Category, created_user_id, assigned_user_id, created_at, updated_at

###  Database Schema Tables:
1.	Users Table:  id, username, email, password, created_at, updated_at
2.	Tasks Table:  id, title, description, due_date, status, priority, category, created_user_id,  assigned_user_id, created_at, updated_at
3.	Relationships:  Each task has foreign keys created_user_id and assigned_user_id linking to the Users table.

###  Backend Implementation 

#### Technologies
•	Node.js
•	Express.js
•	MySQL
•	JWT
•	bcrypt.js
•	node-cron (for notifications)
•	sequelize
•	nodemailer


#### Project Structure:
•	/models: Contains sequelize models for SQL schema.
•	/controllers: Contains business logic for handling requests.
•	/routes: Contains route definitions.
•	/middleware: Contains middleware functions, such as authentication checks.
•	/config: Contains configuration files, such as database connections.
•	/utils: Contains utility functions, e.g., for sending notifications.

### Frontend Implementation

#### Technologies:
•	React.js
•	React Router
•	Axios (for API calls)
•	React Hook Form (for forms)

#### Project Key Pages:
1.	Login Page
2.	Registration Page
3.	Task List Page - Shows tasks with filtering options.
4.	Task Management Page - For creating and updating tasks.
5.	User Profile Page - For managing user account details.
6.	Help Page - For help and documentation.

