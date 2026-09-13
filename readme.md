# Task Management System

A full-stack task management application built with React, Node.js, Express, MongoDB Atlas, and JWT authentication.

The application allows users to create, manage, update, search, filter, and delete their personal tasks through a secure authenticated interface.

---

## Features

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Protected frontend routes
- Logout functionality
- Persistent authentication using localStorage

### Task Management

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Change task status
- Search tasks by title
- Filter tasks by status
- Task ownership by authenticated user

### Dashboard

- Total task count
- Pending task count
- In Progress task count
- Completed task count
- Recent tasks
- Dynamic statistics from MongoDB

### User Profile

- Display logged-in user's name
- Display email
- Display role
- View personal tasks
- Logout

### UI/UX

- Responsive design
- React-Bootstrap
- Loading states
- Error messages
- Form validation
- 404 page
- Hover animations
- Modern dashboard interface

---

# Technology Stack

## Frontend

- React
- Vite
- React Router
- React-Bootstrap
- Bootstrap
- JavaScript
- Context API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Database

- MongoDB Atlas

## Development Tools

- VS Code
- Git
- GitHub
- npm
- Postman / cURL

---

# Project Architecture

```text
Task Team manager/
│
├── task-management-frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── TaskContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
│
├── task-management-backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controller/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
Application Flow
User
 │
 ▼
React Frontend
 │
 ├── Register
 │      │
 │      ▼
 │   Express API
 │      │
 │      ▼
 │   bcrypt
 │      │
 │      ▼
 │   MongoDB
 │
 └── Login
        │
        ▼
     Express API
        │
        ▼
    JWT Token
        │
        ▼
    AuthContext
        │
        ▼
    Protected Routes
        │
        ▼
     Task API
        │
        ▼
    MongoDB Atlas
Authentication Flow
Register
   ↓
POST /api/auth/register
   ↓
Validate user
   ↓
Hash password with bcrypt
   ↓
Save user in MongoDB

Login:

Login
   ↓
POST /api/auth/login
   ↓
Find user
   ↓
Compare password
   ↓
Generate JWT
   ↓
Return token + user
   ↓
Store authentication state

Protected request:

Frontend
   ↓
Authorization: Bearer <JWT>
   ↓
authMiddleware
   ↓
Verify JWT
   ↓
req.user.id
   ↓
Controller
   ↓
MongoDB
Task Ownership

Every task belongs to the authenticated user.

User A
 │
 ├── Task A1
 ├── Task A2
 └── Task A3

User B
 │
 ├── Task B1
 └── Task B2

The backend uses the authenticated user's ID when creating and retrieving tasks.

This prevents one user from accessing another user's tasks.

API Endpoints
Authentication
Register
POST /api/auth/register

Request:

{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "123456"
}
Login
POST /api/auth/login

Request:

{
  "email": "demo@example.com",
  "password": "123456"
}
Task API

All task endpoints require JWT authentication.

Get all tasks
GET /api/tasks
Get single task
GET /api/tasks/:id
Create task
POST /api/tasks

Request:

{
  "title": "Build React Dashboard",
  "description": "Create an industry-level dashboard"
}
Update task
PUT /api/tasks/:id

Request:

{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "In Progress"
}
Delete task
DELETE /api/tasks/:id
Task Status

Tasks support three statuses:

Pending
In Progress
Completed

The user can manually change the status from the task interface.

Environment Variables
Backend

Create:

task-management-backend/.env

Add:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
Frontend

Create:

task-management-frontend/.env

Add:

VITE_API_URL=http://localhost:5001/api

Never commit .env files to GitHub.# TASK-MANAGEMENT-SYSTEM
