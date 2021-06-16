/* File name: contacts.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

const express = require("express");
const contactsController = require("../controllers/contacts")
const router = express.Router();

/**
 * @route GET /contacts
 * @author Tanisha Sharma
 * @returns Render to "contacts" view
 */
router.get("/", contactsController.list);

/**
 * @route GET /contacts/create
 * @author Tanisha Sharma
 * @returns Render to "contacts" view
 */
router.get("/create", contactsController.viewCreate);

/**
 * @route POST /contacts
 * @author Tanisha Sharma
 * @param {string} name.body.required - name
 * @param {string} phone.body.required - phone
 * @param {string} email.body.required - email
 * @param {string} message.body - message
 * @returns Redirects to "/contacts"
 */
router.post("/", contactsController.create);

/**
 * @route GET /contacts/edit/:id
 * @author Tanisha Sharma
 * @param {string} id.params.required - id
 * @returns Render to "contacts" view
 */
router.get("/edit/:id", contactsController.viewEdit);

/**
 * @route POST /contacts/edit/:id
 * @author Tanisha Sharma
 * @param {string} id.params.required - id
 * @param {string} name.body.required - name
 * @param {string} phone.body.required - phone
 * @param {string} email.body.required - email
 * @param {string} message.body - message
 * @returns Redirects to "/contacts"
 */
router.post("/edit/:id", contactsController.edit);

/**
 * @route GET /contacts/delete/:id
 * @author Tanisha Sharma
 * @param {string} id.params.required - id
 * @returns Redirects to "/contacts"
 */
router.get("/delete/:id", contactsController.delete);

module.exports = router;
