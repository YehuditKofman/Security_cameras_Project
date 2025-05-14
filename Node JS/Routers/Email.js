const express = require('express');
const router = express.Router();
const { sendEmail } = require('..//Middleware/email'); // הנתיב לפי מיקום הקובץ שלך

router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing fields: to, subject or text.' });
  }

  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

module.exports = Email;
