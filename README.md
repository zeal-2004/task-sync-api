# TaskSync API

TaskSync is a RESTful backend API designed to manage personal and group tasks, along with real-time notifications. Built with **Node.js**, **Express**, and **MongoDB**, it offers robust features such as group task sharing, individual task management, and notification tracking — all packaged in a clean API interface.

---

## 🌐 Live API

**Base URL:**

[https://task-sync-3tkr.onrender.com](https://task-sync-3tkr.onrender.com)

> Use
> [Postman](https://www.postman.com/) or a similar tool to test and explore the API.

---

## 🚀 Features

- ✅ User registration and login
- ✅ Create/update/delete/view personal and shared tasks
- ✅ Mark tasks as completed
- ✅ Receive and read notifications (e.g., new tasks added by others)
- ✅ Filter, search and sort tasks (by completion status, priority, etc.)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Notifications**: MongoDB-based triggers
- **Deployment**: Docker, Render

---

## 📦 API Endpoints

### 🔐 Auth

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Login user    |

### ✅ Tasks

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/tasks`     | Fetch all tasks   |
| POST   | `/tasks`     | Create a new task |
| PUT    | `/tasks/:id` | Update task       |
| DELETE | `/tasks/:id` | Delete task       |

### 📢 Notifications

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `/notifications`          | Get all notifications       |
| PUT    | `/notifications/:id/read` | Mark a notification as read |


> 🔐 **Note**: All protected routes require a valid JWT token in the `Authorisation` header as `Bearer <token>`.

---