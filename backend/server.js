const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const messagesRoutes = require('./routes/messages');
const { authMiddleware, getUserFromToken } = require('./middleware/auth');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
console.log('Starting server...');
mongoose.connect('mongodb://localhost:27017/minichat', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
  });
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', authMiddleware, usersRoutes);
app.use('/api', authMiddleware, messagesRoutes);

const onlineUsers = new Map();

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  const user = await getUserFromToken(token);
  if (!user) return next(new Error('Unauthorized'));
  socket.user = user;
  next();
});

io.on('connection', (socket) => {
  onlineUsers.set(socket.user.username, true);
  io.emit('users', Array.from(onlineUsers.keys()).map(username => ({ username, online: true })));

  socket.on('chat message', async (msg) => {
    const message = new Message({ username: socket.user.username, text: msg.text });
    await message.save();
    io.emit('chat message', { username: socket.user.username, text: msg.text });
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(socket.user.username);
    io.emit('users', Array.from(onlineUsers.keys()).map(username => ({ username, online: true })));
  });
});

server.listen(5000, () => console.log('Server started on port 5000'));