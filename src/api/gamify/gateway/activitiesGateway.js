const gamifyGateway = require('../gamifyGateway');

// Notify user of a new activity (relayed through the main gamify gateway)
function notifyActivity(userId, activity) {
  // You can use a custom event or reuse notifyMessage/notifyNotification
  gamifyGateway.emitToUserId(userId, 'gamify:activity', activity);
}

module.exports = {
  notifyActivity
};

/*
Example usage:
const activitiesGateway = require('./activitiesGateway');
activitiesGateway.notifyActivity(userId, { type: 'post_created', meta: { postId: '...' } });
*/
