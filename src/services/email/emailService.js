const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME || 'user@example.com',
    pass: process.env.SMTP_PASSWORD || 'password',
  },
  tls: process.env.SMTP_TLS === 'true' ? { rejectUnauthorized: false } : undefined,
});

async function sendEmail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USERNAME || 'no-reply@example.com',
    to,
    subject,
    text,
    html,
  });
  return info;
}

module.exports = {
  sendEmail,
};
