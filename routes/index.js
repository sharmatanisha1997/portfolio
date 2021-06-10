/* File name: index.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/05/28
 */

const express = require('express');
const router = express.Router();

/**
 * @route GET /
 * @author Tanisha Sharma
 * @returns Render to "index" view
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', page_name: "home" });
});


/**
 * @route GET /about
 * @author Tanisha Sharma
 * @returns Render to "about" view
 */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express', page_name: "about" });
});

/**
 * @route GET /contact
 * @author Tanisha Sharma
 * @returns Render to "contact" view
 */
 router.get('/contact', function(req, res, next) {
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
router.post('/contact', async function(req, res, next) {
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

/**
 * @route GET /projects
 * @author Tanisha Sharma
 * @returns Render to "projects" view
 */
 router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Express', page_name: "projects" });
});

/**
 * @route GET /services
 * @author Tanisha Sharma
 * @returns Render to "services" view
 */
 router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Express', page_name: "services" });
});

module.exports = router;
