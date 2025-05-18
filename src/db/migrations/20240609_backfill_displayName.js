const mongoose = require('mongoose');
const path = require('path');

// Adjust the path as needed for your project structure
const User = require(path.join(__dirname, '../models/user/userModel'));

async function addDisplayName() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/beamify_dev';
  await mongoose.connect(mongoUri);
  const users = await User.find({ $or: [ { 'profile.displayName': { $exists: false } }, { 'profile.displayName': null } ] });
  for (const user of users) {
    user.profile = user.profile || {};
    user.profile.displayName = user.username;
    await user.save();
    console.log(`Updated user ${user.username} with displayName ${user.username}`);
  }
  await mongoose.disconnect();
  console.log('Backfill complete.');
}

addDisplayName().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 
