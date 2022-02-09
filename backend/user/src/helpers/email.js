require('dotenv').config();
const Logger = require('../config/winston');
const { transporter } = require('../config/email');

const sendEmail = async ({ to, subject, text, html }) => {
  // Validate valid email
  if ((!to || !subject) && (!text || !html))
    throw new Error('Missing argunments [sendEmail]');

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    text,
    html
  };

  // Log data
  Logger.info('Email sent data: ', JSON.stringify(mailOptions));

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = { sendEmail };
