const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send interest notification email
const sendInterestNotification = async (authorEmail, authorName, interestedUserName, postTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: authorEmail,
    subject: `New Interest in Your Post: ${postTitle}`,
    html: `
      <h2>New Interest in Your Post</h2>
      <p>Hello ${authorName},</p>
      <p>${interestedUserName} has expressed interest in your post "${postTitle}".</p>
      <p>You can view their profile and start a conversation with them through the platform.</p>
      <p>Best regards,<br>SkillSync Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Interest notification email sent successfully');
  } catch (error) {
    console.error('Error sending interest notification email:', error);
    throw error;
  }
};

module.exports = {
  sendInterestNotification
}; 