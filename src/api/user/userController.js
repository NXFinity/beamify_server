/**
 * User Management
 */
const userService = require('./userService');
const uploadToSpaces = require('../../utils/doSpaces').uploadToSpaces;
const multer = require('multer');
const upload = multer();
const User = require('../../db/models/user/userModel');
const Photo = require('../../db/models/user/photoModel');
const Developer = require('../../db/models/user/developerModel');
const mongoose = require('mongoose');
const sharp = require('sharp');
let Gamify;
try {
  Gamify = require('../../db/models/gamify/gamifyModel');
} catch (e) {
  Gamify = null;
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Public: Get user by username (public fields only)
exports.getUserByUsername = async (req, res, next) => {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    const userId = req.user.id || req.user._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    // Fetch the user (excluding passwordHash)
    const user = await User.findById(userId).select('-passwordHash');

    // Fetch related data
    const developer = await Developer.findOne({ user: userId });
    const photos = await Photo.find({ user: userId });
    let gamify = null;
    if (Gamify) {
      // Ensure userId is an ObjectId for the query, using 'new' keyword
      const objectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;
      gamify = await Gamify.findOne({ user: objectId });
    }

    // Attach related data
    const userObj = user.toObject();
    userObj.developer = developer;
    userObj.photos = photos;
    userObj.gamify = gamify;

    res.json(userObj);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

// POST /users/:id/avatar
exports.uploadAvatar = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
      // Only allow image mimetypes
      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: 'Invalid file type' });
      }
      // Resize to max 500x500
      let buffer;
      try {
        buffer = await sharp(req.file.buffer)
          .resize(500, 500, { fit: 'cover' })
          .toBuffer();
      } catch (err) {
        return res.status(400).json({ message: 'Failed to process image' });
      }
      const url = await uploadToSpaces({
        userId: req.params.id,
        fileBuffer: buffer,
        fileName: `avatar_${Date.now()}`,
        mimeType: req.file.mimetype,
      });
      const user = await userService.uploadAvatar(req.params.id, url);
      res.json({ avatar: url, user });
    } catch (err) {
      next(err);
    }
  }
];

// POST /users/:id/cover
exports.uploadCover = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
      // Only allow image mimetypes
      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: 'Invalid file type' });
      }
      // Resize to max 1500x500
      let buffer;
      try {
        buffer = await sharp(req.file.buffer)
          .resize(1500, 500, { fit: 'cover' })
          .toBuffer();
      } catch (err) {
        return res.status(400).json({ message: 'Failed to process image' });
      }
      const url = await uploadToSpaces({
        userId: req.params.id,
        fileBuffer: buffer,
        fileName: `cover_${Date.now()}`,
        mimeType: req.file.mimetype,
      });
      const user = await userService.uploadCover(req.params.id, url);
      res.json({ cover: url, user });
    } catch (err) {
      next(err);
    }
  }
];

// POST /users/:id/photos
exports.uploadPhoto = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
      const url = await uploadToSpaces({
        userId: req.params.id,
        fileBuffer: req.file.buffer,
        fileName: `photo_${Date.now()}`,
        mimeType: req.file.mimetype,
      });
      const caption = req.body.caption || '';
      const photo = await userService.addPhoto(req.params.id, url, caption);
      res.json({ photo });
    } catch (err) {
      next(err);
    }
  }
];
