const mongoose = require('mongoose');
const User = require('../models/user/userModel');
const Gamify = require('../models/gamify/gamifyModel');

/**
 * Migration: Fix Gamify.user references to ensure they match existing User _id values.
 * - Logs orphaned Gamify docs (no matching User)
 * - Optionally, you can add custom logic to map old user ids to new ones if you have a mapping
 */

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beamify_dev');
  console.log('Connected to MongoDB');

  const gamifies = await Gamify.find();
  let fixed = 0;
  let orphans = 0;

  for (const gamify of gamifies) {
    const userId = gamify.user;
    const user = await User.findById(userId);
    if (!user) {
      // Orphaned gamify profile
      orphans++;
      console.log(`[ORPHAN] Gamify _id=${gamify._id} has user=${userId} which does not exist.`);
      // Example: If you have a mapping, you could update here
      // const newUserId = ...;
      // if (newUserId) {
      //   gamify.user = newUserId;
      //   await gamify.save();
      //   fixed++;
      //   console.log(`[FIXED] Gamify _id=${gamify._id} user updated to ${newUserId}`);
      // }
    }
  }

  console.log(`Migration complete. Orphaned gamify profiles: ${orphans}. Fixed: ${fixed}.`);
  await mongoose.disconnect();
}

if (require.main === module) {
  migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
} 