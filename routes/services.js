/* File name: services.js
 * Student's Name: Tanisha Sharma
 * StudentID: 
 * Date: 2021/05/28
 */
const express = require('express');
const router = express.Router();

/**
 * @route GET /services
 * @author Tanisha Sharma
 * @returns Render to "services" view
 */
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Express', page_name: "services" });
});

module.exports = router;
