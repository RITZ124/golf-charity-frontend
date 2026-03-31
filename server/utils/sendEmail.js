const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"Golf Charity Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.response);

    return info;
  } catch (error) {
    console.log('EMAIL ERROR:', error);

    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;