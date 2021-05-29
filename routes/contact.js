/* File name: contact.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/05/28
 */
const express = require('express');
const { sendMail } = require("../services/emailer")
const router = express.Router();

/**
 * @route GET /contact
 * @author Tanisha Sharma
 * @returns Render to "contact" view
 */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Express', page_name: "contact" });
});

/**
 * @route POST /contact
 * @author Tanisha Sharma
 * @param {string} firstname.body.required - firstname
 * @param {string} lastname.body.required - lastname
 * @param {string} email.body.required - email
 * @param {string} phone.body.required - phone
 * @param {string} message.body.required - message
 * @returns Redirect to "/" path
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async function(req, res, next) {
  try {
    const { firstname, lastname, phone, email, message } = req.body
    if(!firstname || !lastname || !phone || !email || !message){
      req.session.message = {
        type: "danger",
        title: "Action failed",
        details: "Required parameters are missing"
      }
      res.redirect('back')
    } else {
      if(process.env.ENABLE_EMAILS === "true"){
        const html = `
          Hey Tanisha,<br /><br />
          You have a contact request from<br/><br/>
          Name: ${firstname} ${lastname}<br/> 
          Email: ${email}<br/> 
          Phone: ${phone}<br/> 
          Message: ${message}<br/> 
        `
        const { message: msg, info } = await sendMail({
          to: process.env.CONTACT_RECEIPIENT_EMAIL,
          subject: "Contact request",
          html,
        })
        console.log({msg,info});
      }
      req.session.message = {
        type: "success",
        title: "Success",
        details: "Contact request has been submitted successfully"
      }
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
});

module.exports = router;
