/* File name: users.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

const express = require("express");
const userController = require("../controllers/users")
const router = express.Router();

/**
 * @route GET /login
 * @author Tanisha Sharma
 * @returns Render to "login" view
 */
router.get("/login", userController.viewLoginPage);

/**
 * @route POST /login
 * @author Tanisha Sharma
 * @param {string} username.body.required - username
 * @param {string} password.body.required - password
 * @returns Redirect to "/contacts" path
 * @returns {Error}  default - Unexpected error
 */
router.post("/login", userController.login);

/**
 * @route GET /logout
 * @author Tanisha Sharma
 * @returns Redirects to "/"
 */
router.get("/logout", userController.logout);
module.exports = router;
