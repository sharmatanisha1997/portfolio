const express = require('express');
const router = express.Router();

/* GET services page. */
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Express', page_name: "services" });
});

module.exports = router;
