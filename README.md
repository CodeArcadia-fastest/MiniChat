# MiniChat

A simple real-time chat application with user registration, login, online status, and a shared chat room.

## Technologies Used

- **Frontend:** React, Socket.IO Client, Axios
- **Backend:** Node.js, Express, Socket.IO, MongoDB (Mongoose), JWT, bcryptjs, CORS
- **Database:** MongoDB

## Project Structure

```
minichat/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       └── services/
├── .gitignore
└── README.md
```

## How to Run the Project

### 1. Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (running locally on default port 27017)

### 2. Clone the repository
```sh
git clone <your-repo-url>
cd minichat
```

### 3. Start MongoDB
Make sure MongoDB is running. On Windows, open a new terminal and run:
```sh
mongod
```

### 4. Start the Backend
```sh
cd backend
npm install
node server.js
```
The backend will run on `http://localhost:5000`

### 5. Start the Frontend
Open a new terminal:
```sh
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

### 6. Open the App
Go to [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- User registration and login (username & password)
- JWT authentication
- Shared chat room for all users
- Online users list
- Real-time messaging (Socket.IO)
- Messages and users stored in MongoDB

## Notes
- For development, both frontend and backend run locally.
- You can open multiple browser windows to test real-time chat and online status.

---

**Enjoy chatting!** 