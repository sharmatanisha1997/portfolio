/* File name: contacts.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

const Contacts = require("../models/contacts");

module.exports = {
  list: async function (req, res, next) {
    try {
      const contacts = await Contacts.find({})
        .collation({ locale: "en" })
        .sort("name");
      res.render("contacts", {
        page_name: "contacts",
        contacts,
        view_type: "all_contacts",
        is_logged_in: req.isAuthenticated(),
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },
  viewCreate: async function (req, res, next) {
    try {
      res.render("contacts", {
        page_name: "contacts",
        contact: null,
        view_type: "create",
        is_logged_in: req.isAuthenticated(),
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },
  create: async function (req, res, next) {
    try {
      const { name, phone, email, message = "" } = req.body;
      await Contacts.create({
        name,
        phone,
        email,
        message,
      });
      req.session.message = {
        type: "success",
        title: "Success",
        details: "Contact has been created successfully",
      };
      res.redirect("/contacts");
    } catch (error) {
      next(error);
    }
  },
  viewEdit: async function (req, res, next) {
    try {
      const contact = await Contacts.findById(req.params.id);
      console.log(contact);
      res.render("contacts", {
        page_name: "contacts",
        contact: contact,
        view_type: "edit",
        is_logged_in: req.isAuthenticated(),
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },
  edit: async function (req, res, next) {
    try {
      const { name, phone, email, message = "" } = req.body;
      await Contacts.findByIdAndUpdate(req.params.id, {
        $set: {
          name,
          phone,
          email,
          message,
        },
      });
      req.session.message = {
        type: "success",
        title: "Success",
        details: "Contact has been updated successfully",
      };
      res.redirect("/contacts");
    } catch (error) {
      next(error);
    }
  },
  delete: async function (req, res, next) {
    try {
      await Contacts.findByIdAndDelete(req.params.id);
      req.session.message = {
        type: "success",
        title: "Success",
        details: "Contact has been deleted successfully",
      };
      res.redirect("/contacts");
    } catch (error) {
      next(error);
    }
  },
};
