const express = require('express');
const router = express.Router();

/* GET projects page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'Express', page_name: "projects" });
});

module.exports = router;
