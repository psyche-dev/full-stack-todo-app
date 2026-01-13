# Todo App

A full-stack task management application with user authentication, built with .NET 9 backend and React frontend.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- User-specific task filtering
- Dark theme UI
- Responsive design

## Tech Stack

### Backend
- .NET 9
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- JWT Bearer Authentication
- Password hashing with ASP.NET Identity

### Frontend
- React 18
- Vite
- React Router
- Axios for API calls
- CSS for styling

## Prerequisites

- .NET 9 SDK
- Node.js 18+
- PostgreSQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Backend setup:
   - Navigate to `backend/` directory
   - Restore packages: `dotnet restore`
   - Set up PostgreSQL database and update connection string in `appsettings.json` or environment variables
   - Run migrations: `dotnet ef database update`
   - Start the backend: `dotnet run`

3. Frontend setup:
   - Navigate to `frontend/` directory
   - Install dependencies: `npm install`
   - Set API base URL in `.env` (e.g., `VITE_API_BASE_URL=http://localhost:5000`)
   - Start the frontend: `npm run dev`

## Usage

1. Register a new account or login with existing credentials
2. Create tasks by entering a title and clicking "Add Task"
3. Mark tasks as complete by checking the checkbox
4. Delete tasks using the "Delete" button
5. Logout when done

## API Endpoints

### Authentication
- `POST /users/register` - Register a new user
- `POST /users/login` - Login and receive JWT token

### Tasks (requires authentication)
- `GET /tasks` - Get user's tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task

## Project Structure

```
todo-app/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Migrations/
│   ├── Data/
│   └── Program.cs
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── api/
│   └── public/
└── README.md
```