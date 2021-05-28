/* File name: emailer.js
 * Student's Name: Tanisha Sharma
 * StudentID: 
 * Date: 2021/05/28
 */

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  service: process.env.EMAIL_SERVICE,
  // port: config.email.port,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * @method sendEmail
 * @author Tanisha Sharma
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @returns {Promise} 
 */
const sendMail = ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Mail has been sent to", to);
        resolve({ message: "Mail Sent!!!", info });
      }
    });
  });
};

module.exports = {
  sendMail,
};
