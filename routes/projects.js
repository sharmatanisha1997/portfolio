/* File name: projects.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/05/28
 */
const express = require('express');
const router = express.Router();

/**
 * @route GET /projects
 * @author Tanisha Sharma
 * @returns Render to "projects" view
 */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'Express', page_name: "projects" });
});

module.exports = router;
