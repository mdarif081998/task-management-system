# Task Management System

## Overview

This is a simple task management system with user authentication, Password Change, task categorization, prioritisation, task assignment and automatic Email alerts for pending tasks on dialy basis features.

## Setup

1. Clone the repository.

2. Navigate to the backend directory and run `npm install`.

3. Create a `.env` file inside backend folder and configure your database and JWT settings with follwing evironment variables.
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

7. access this url http://localhost:3000 in browser to use the application.
 

## Project Overview ##

### User Authentication Features

1. User Registration
2. User Login
3. Password Hashing
4. Change Password feature
5. JWT for Authentication

### Task Management Features

1. Create, Read, Update, Delete Operations on Tasks
2. Filter Tasks based on status, priority and category.
3. Assign tasks to users for complteting with due date.
4. Automatic email alerts for pending tasks on dialy basis.
5. Task Fields: id, Title, Description, Due Date, Status, Priority, Category, created_user_id, assigned_user_id, created_at, updated_at

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
1. /models: Contains sequelize models for SQL schema.
2. /controllers: Contains business logic for handling requests.
3. /routes: Contains route definitions.
4. /middleware: Contains middleware functions, such as authentication checks.
5. /config: Contains configuration files, such as database connections.
6. /utils: Contains utility functions, e.g., for sending notifications.

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


[Download the complete Documentation along with screenshots of running application by clicking here](https://docs.google.com/document/d/1-6GiSnZB-IH59R9HXpa4DI3Hov2CbgVp/edit?usp=sharing&ouid=105982460380715018391&rtpof=true&sd=true)