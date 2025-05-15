// Gamify Gateway: Real-time gamification events via Socket.IO
require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

const PORT = process.env.GAMIFY_GATEWAY_PORT || 4001;
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

const server = http.createServer();
const io = socketio(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Map of socket.id => userId
const socketUserMap = new Map();

io.use((socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;
  if (!token) return next(new Error('Authentication required'));
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error('Invalid token'));
    socket.userId = decoded.id || decoded._id || decoded.userId;
    if (!socket.userId) return next(new Error('Invalid user in token'));
    next();
  });
});

io.on('connection', (socket) => {
  const userId = socket.userId;
  socket.join(userId);
  socketUserMap.set(socket.id, userId);
  console.log(`User ${userId} connected to gamify gateway.`);

  socket.on('disconnect', () => {
    socketUserMap.delete(socket.id);
    console.log(`User ${userId} disconnected from gamify gateway.`);
  });
});

// --- Event Emitters ---
function emitToUserId(userId, event, payload) {
  io.to(userId).emit(event, payload);
}
function notifyPoints(userId, data) {
  emitToUserId(userId, 'gamify:points', data);
  // Also send a notification event
  emitToUserId(userId, 'gamify:notification', {
    type: 'points',
    message: data.message || `You received ${data.points} points!`,
    ...data
  });
}
function notifyLevel(userId, data) {
  emitToUserId(userId, 'gamify:level', data);
  emitToUserId(userId, 'gamify:notification', {
    type: 'level',
    message: data.message || `You reached level ${data.level}!`,
    ...data
  });
}
function notifyCrystals(userId, data) {
  emitToUserId(userId, 'gamify:crystals', data);
  emitToUserId(userId, 'gamify:notification', {
    type: 'crystals',
    message: data.message || `You received ${data.crystals} crystals!`,
    ...data
  });
}
function notifyBadge(userId, data) {
  emitToUserId(userId, 'gamify:badge', data);
}
function notifyReward(userId, data) {
  emitToUserId(userId, 'gamify:reward', data);
}
function notifyMessage(userId, data) {
  emitToUserId(userId, 'gamify:message', data);
}
function notifyNotification(userId, data) {
  emitToUserId(userId, 'gamify:notification', data);
}

// --- Exported API for other modules ---
module.exports = {
  io,
  emitToUserId,
  notifyPoints,
  notifyLevel,
  notifyCrystals,
  notifyBadge,
  notifyReward,
  notifyMessage,
  notifyNotification
};

// --- Start server if run directly ---
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Gamify Gateway running on port ${PORT}`);
  });
}

/*
Example usage from another module:
const gamifyGateway = require('./gamifyGateway');
gamifyGateway.notifyPoints(userId, { points: 100, reason: 'First post!' });
gamifyGateway.notifyLevel(userId, { level: 2 });
gamifyGateway.notifyCrystals(userId, { crystals: 5 });
*/
