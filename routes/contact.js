const express = require('express');
const router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Express', page_name: "contact" });
});

/* POST contact */
router.post('/', function(req, res) {
  const { firstname, lastname, phone, email, message } = req.body
  if(!firstname || !lastname || !phone || !email || !message){
    req.session.message = {
      type: "danger",
      title: "Action failed",
      details: "Required parameters are missing"
    }
  } else {
    req.session.message = {
      type: "success",
      title: "Success",
      details: "Contact request has been submitted successfully"
    }
  }
  res.redirect('/');
});

module.exports = router;
