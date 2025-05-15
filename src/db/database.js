const mongoose = require('mongoose');
const { printBanner, printMongoConnected } = require('../utils/consoleBanner');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/beamify_dev';

(async () => {
  await printBanner();
  mongoose.connect(mongoURI);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    await printMongoConnected();
  });

  module.exports = db;
})();
