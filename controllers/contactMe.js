/* File name: contactMe.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

const Contacts = require("../models/contacts");

module.exports = {
  view: function (req, res, next) {
    res.render("contact", {
      page_name: "contact",
      is_logged_in: req.isAuthenticated(),
      user: req.session.user,
    });
  },
  post: async function (req, res, next) {
    try {
      const { firstname, lastname, phone, email, message } = req.body;
      if (!firstname || !lastname || !phone || !email || !message) {
        req.session.message = {
          type: "danger",
          title: "Action failed",
          details: "Required parameters are missing",
        };
        res.redirect("back");
      } else {
        await Contacts.create({
          name: `${firstname} ${lastname}`,
          phone,
          email,
          message,
        });
        req.session.message = {
          type: "success",
          title: "Success",
          details: "Contact request has been submitted successfully",
        };
        res.redirect("/");
      }
    } catch (error) {
      next(error);
    }
  },
};
