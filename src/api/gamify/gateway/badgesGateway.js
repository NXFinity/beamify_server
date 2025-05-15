const gamifyGateway = require('../gamifyGateway');

// Notify user of a new badge (relayed through the main gamify gateway)
function notifyBadge(userId, badge) {
  gamifyGateway.notifyBadge(userId, badge);
}

module.exports = {
  notifyBadge
};

/*
Example usage:
const badgesGateway = require('./badgesGateway');
badgesGateway.notifyBadge(userId, { name: 'First Post', description: 'You made your first post!' });
*/
