const crypto = require('crypto');

// Generate a random code verifier
function generateCodeVerifier(length = 128) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
}

// Generate a code challenge from a code verifier (S256 method)
function generateCodeChallenge(verifier) {
  return crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
}

// Validate a code challenge against a verifier
function validateCodeChallenge(verifier, challenge) {
  return generateCodeChallenge(verifier) === challenge;
}

module.exports = {
  generateCodeVerifier,
  generateCodeChallenge,
  validateCodeChallenge,
};
