/* File name: contactMe.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

const express = require("express");
const contactMeController = require("../controllers/contactMe")
const router = express.Router();

/**
 * @route GET /contact
 * @author Tanisha Sharma
 * @returns Render to "contact" view
 */
router.get("/", contactMeController.view);

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
router.post("/", contactMeController.post);

module.exports = router
