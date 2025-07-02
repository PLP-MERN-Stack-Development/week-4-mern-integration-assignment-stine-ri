# MERN Blog Application

This is a full-stack blog application built with the **MERN stack** (MongoDB, Express, React, Node.js). It includes user authentication, admin authorization, and features for managing blog posts and categories.

## 🔥 Features

### 🚀 Frontend (React + Tailwind CSS)
- User registration and login
- JWT-based authentication
- Responsive UI with Tailwind CSS
- Create, read, update, and delete (CRUD) blog posts
- Role-based access (admin can create categories and manage posts)
- Admin dashboard with post and user management

### 🛠️ Backend (Node.js + Express + MongoDB)
- RESTful API with Express.js
- MongoDB for data storage using Mongoose
- JWT Authentication & Authorization middleware
- Secure routes for admins and users
- Error handling middleware
- Environment configuration with `dotenv`

---

## 📂 Project Structure
.
├── client # Frontend (React)
│ ├── components
│ ├── pages
│ ├── api
│ └── ...
├── server # Backend (Node.js + Express)
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ └── server.js
├── .env
├── package.json
├── README.md
└── ...


---

## 🧪 Tech Stack

- **Frontend:** React, React Router DOM, Tailwind CSS, Framer Motion
- **Backend:** Express.js, MongoDB, Mongoose, JWT
- **Tools:** Vite, Postman, PNPM/NPM

---

## 📦 Installation

### Clone the repo:
```bash
git clone https://github.com/your-username/mern-blog-app.git
cd mern-blog-app

Setup backend

cd server
pnpm install    
pnpm run dev     

Setup frontend

cd client
pnpm install      
pnpm run dev      

🔐 Environment Variables
Create a .env file in the /server directory with the following:

🔐env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

📬 API Endpoints
Auth
POST /api/auth/register - Register a user

POST /api/auth/login - Login a user

Posts
GET /api/posts - Get all posts

POST /api/posts - Create a post (requires auth)

PUT /api/posts/:id - Update a post

DELETE /api/posts/:id - Delete a post

Categories (Admin only)
POST /api/categories - Create a category

GET /api/categories - List all categories

🛡️ Admin Access
Only users with an isAdmin flag set to true can:

Create new categories

Access admin dashboard

Manage all posts and users

🧑‍💻 Author
Christine Nyambwari

Built with 💙 during a MERN stack integration assignment.

