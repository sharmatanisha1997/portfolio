/* File name: index.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/05/28
 */

const express = require("express");
const indexControllers = require("../controllers")
const router = express.Router();

/**
 * @route GET /
 * @author Tanisha Sharma
 * @returns Render to "index" view
 */
router.get("/", indexControllers.viewIndexPage);

/**
 * @route GET /about
 * @author Tanisha Sharma
 * @returns Render to "about" view
 */
router.get("/about", indexControllers.viewAboutPage);

/**
 * @route GET /projects
 * @author Tanisha Sharma
 * @returns Render to "projects" view
 */
router.get("/projects", indexControllers.viewProjectsPage);

/**
 * @route GET /services
 * @author Tanisha Sharma
 * @returns Render to "services" view
 */
router.get("/services", indexControllers.viewServicesPage);

module.exports = router;
