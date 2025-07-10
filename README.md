# My Notes App

A full-stack notes application built with Next.js (client) and Express/MongoDB (server).

## Features
- User registration and login (JWT authentication)
- Create, read, update, and delete notes
- Responsive UI
- Secure password storage (bcrypt)

## Tech Stack
- **Frontend:** Next.js, React
- **Backend:** Express.js, Node.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/my-notes-app.git
cd my-notes-app
```

### 2. Setup Environment Variables
Create a `.env` file in the `server` directory:
```
MONGODB_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies
#### Server
```bash
cd server
npm install
```
#### Client
```bash
cd ../client
npm install
```

### 4. Run the Applications
#### Start the backend server
```bash
cd server
npm run dev
```
#### Start the frontend (Next.js) client
```bash
cd ../client
npm run dev
```

- Backend: [http://localhost:5000](http://localhost:5000)
- Frontend: [http://localhost:3000](http://localhost:3000)

### 5. API Endpoints
- `POST /api/register` — Register a new user
- `POST /api/login` — Login and receive JWT
- `GET /api/notes` — Get all notes (auth required)
- `POST /api/notes` — Create a note (auth required)
- `PUT /api/notes/:id` — Update a note (auth required)
- `DELETE /api/notes/:id` — Delete a note (auth required)

## Folder Structure
```
my-notes-app/
  client/      # Next.js frontend
  server/      # Express backend
```

## License
MIT
