# Visa Alert Tracker

This repository contains a **full‑stack Visa Alert Tracker application** built as a monorepo with separate `client` and `server` folders.

The goal of this project is to allow users to create, view, update, delete, and filter visa alerts efficiently, with a clean UI and a scalable backend structure.

---

## Repository Structure

```
visa-alert-tracker/
│
├── client/   # Frontend (React + Ant Design)
├── server/   # Backend (Node.js + Express + MongoDB)
├── README.md
└── .gitignore
```

---

## Backend Overview (server)

The backend is responsible for handling all business logic and data persistence.

### Features

- RESTful APIs for visa alerts
- Create, read, update, and delete (CRUD) visa alerts
- Search and filter alerts by country and visa type
- Centralized error handling using Express middleware
- MongoDB data modeling using Mongoose

### API Responsibilities

- Validate incoming request data
- Interact with MongoDB to store and retrieve alerts
- Support query parameters for filtering
- Return consistent API responses

### Backend Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

### Backend Deployment

- Deployed URL: https://visa-alert-tracker-flying-panda.onrender.com

---

## Frontend Overview (client)

The frontend provides an interactive dashboard for managing visa alerts.

### Features

- List visa alerts in card layout
- Create and edit alerts using modal forms
- Delete alerts with optimistic UI updates
- Search by country
- Filter by visa type
- Pagination for better performance
- Skeleton loaders to improve perceived speed

### Frontend Tech Stack

- React
- Ant Design
- Axios

### Frontend Deployment

- Deployed URL: https://visa-alert-tracker-flying-panda.vercel.app/

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local or cloud)

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Create a `.env` file in the `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Design Decisions

- **Monorepo structure** was chosen to keep frontend and backend tightly coupled and easier to review in a single repository.
- **Ant Design** was used to speed up UI development while maintaining consistency.
- **Server-side filtering** was implemented to ensure scalability and reduce frontend data processing.
- **Optimistic UI updates** were added for update and delete actions to improve user experience.
- **Skeleton loading** was preferred over spinners to make loading states feel faster.

---

## What I Would Improve for Production

- Add authentication and user-based access control
- Implement server-side pagination instead of client-side slicing
- Add rate limiting and request validation middleware
- Improve logging and monitoring
- Write unit and integration tests
- Add CI/CD pipeline

---

## Where AI Helped vs Where I Had to Think

### Where AI Helped

- Speeding up boilerplate code for controllers and components
- Suggesting better folder structure and naming conventions
- Helping debug React state and re-render issues
- Improving error handling patterns

### Where I Had to Think

- Designing the API contract and deciding what filtering should happen on the backend
- Handling performance issues like re-renders and UI delays
- Implementing optimistic UI updates safely
- Making architectural decisions for a clean monorepo setup
- Debugging integration issues between frontend and backend

---

## Final Notes

This project focuses on clarity, structure, Splitting concerns, and Realistic Implementation. The codebase is intentionally kept clean and readable to reflect real world development practices.
