/* File name: index.js
 * Student's Name: Tanisha Sharma
 * StudentID: 
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

module.exports = router;
