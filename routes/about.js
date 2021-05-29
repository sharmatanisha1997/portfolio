/* File name: about.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/05/28
 */

const express = require('express');
const router = express.Router();

/**
 * @route GET /about
 * @author Tanisha Sharma
 * @returns Render to "about" view
 */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'Express', page_name: "about" });
});

module.exports = router;
