// Migration: Add isBanned to user.status if missing
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/beamify_dev';

async function migrate() {
  await mongoose.connect(MONGO_URI);
  const User = mongoose.connection.collection('users');

  // Update all users: add status.isBanned = false if missing
  const result = await User.updateMany(
    { $or: [ { 'status.isBanned': { $exists: false } }, { status: { $exists: false } } ] },
    { $set: { 'status.isBanned': false } }
  );
  console.log(`Updated ${result.modifiedCount} users to add status.isBanned: false`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 
