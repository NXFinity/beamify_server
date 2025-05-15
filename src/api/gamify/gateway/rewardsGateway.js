const gamifyGateway = require('../gamifyGateway');

// Notify user of a new reward (relayed through the main gamify gateway)
function notifyReward(userId, reward) {
  gamifyGateway.notifyReward(userId, reward);
}

module.exports = {
  notifyReward
};

/*
Example usage:
const rewardsGateway = require('./rewardsGateway');
rewardsGateway.notifyReward(userId, { title: 'First Login', description: 'You logged in for the first time!' });
*/
