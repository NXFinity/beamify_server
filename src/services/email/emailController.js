const { sendEmail } = require('./emailService');

// POST /email/test
async function sendTestEmail(req, res, next) {
  try {
    const { to, subject, text } = req.body;
    const info = await sendEmail({ to, subject, text });
    res.json({ message: 'Email sent', info });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sendTestEmail,
};
