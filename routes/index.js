/* File name: index.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/05/28
 */

const express = require("express");
const Users = require("../models/users");
const Contacts = require("../models/contacts");
const bcryptjs = require("bcryptjs");
const router = express.Router();

/**
 * @route GET /
 * @author Tanisha Sharma
 * @returns Render to "index" view
 */
router.get("/", function (req, res, next) {
  res.render("index", {
    page_name: "home",
    is_logged_in: req.session.is_logged_in,
    user: req.session.user,
  });
});

/**
 * @route GET /about
 * @author Tanisha Sharma
 * @returns Render to "about" view
 */
router.get("/about", function (req, res, next) {
  res.render("about", {
    page_name: "about",
    is_logged_in: req.session.is_logged_in,
    user: req.session.user,
  });
});

/**
 * @route GET /contact
 * @author Tanisha Sharma
 * @returns Render to "contact" view
 */
router.get("/contact", function (req, res, next) {
  res.render("contact", {
    page_name: "contact",
    is_logged_in: req.session.is_logged_in,
    user: req.session.user,
  });
});

/**
 * @route POST /contact
 * @author Tanisha Sharma
 * @param {string} firstname.body.required - firstname
 * @param {string} lastname.body.required - lastname
 * @param {string} email.body.required - email
 * @param {string} phone.body.required - phone
 * @param {string} message.body.required - message
 * @returns Redirect to "/" path
 * @returns {Error}  default - Unexpected error
 */
router.post("/contact", async function (req, res, next) {
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
      req.session.message = {
        type: "success",
        title: "Success",
        details: "Contact request has been submitted successfully",
      };
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @route GET /projects
 * @author Tanisha Sharma
 * @returns Render to "projects" view
 */
router.get("/projects", function (req, res, next) {
  res.render("projects", {
    page_name: "projects",
    is_logged_in: req.session.is_logged_in,
    user: req.session.user,
  });
});

/**
 * @route GET /services
 * @author Tanisha Sharma
 * @returns Render to "services" view
 */
router.get("/services", function (req, res, next) {
  res.render("services", {
    page_name: "services",
    is_logged_in: req.session.is_logged_in,
    user: req.session.user,
  });
});

/**
 * @route GET /login
 * @author Tanisha Sharma
 * @returns Render to "login" view
 */
router.get("/login", function (req, res, next) {
  res.render("login", {
    page_name: "login",
    is_logged_in: req.session.is_logged_in,
    user: req.session.user,
  });
});

/**
 * @route POST /login
 * @author Tanisha Sharma
 * @param {string} username.body.required - username
 * @param {string} password.body.required - password
 * @returns Redirect to "/contacts" path
 * @returns {Error}  default - Unexpected error
 */
router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    let hasError = false,
      errorMessage = "",
      user = null;
    if (!username || !password) {
      hasError = true;
      errorMessage = "Required parameters are missing";
    } else {
      user = await Users.findOne({ username });
      if (!user) {
        hasError = true;
        errorMessage = "User doesn't exists";
      } else if (user) {
        const passwordMatched = bcryptjs.compareSync(password, user.password);
        if (passwordMatched) {
          req.session.is_logged_in = true;
          req.session.user = user;
          res.redirect("/contacts");
        } else {
          hasError = true;
          errorMessage = "Password didn't matched";
        }
      }
    }
    if (hasError) {
      req.session.message = {
        type: "danger",
        title: "Action failed",
        details: errorMessage,
      };
      res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @route GET /logout
 * @author Tanisha Sharma
 * @returns Redirects to "/"
 */
router.get("/logout", checkAuth, function (req, res, next) {
  req.session.destroy()
  res.redirect("/");
});

/**
 * @route GET /contacts
 * @author Tanisha Sharma
 * @returns Render to "contacts" view
 */
router.get("/contacts", checkAuth, async function (req, res, next) {
  try {
    const contacts = await Contacts.find({})
      .collation({ locale: "en" })
      .sort("name");
    res.render("contacts", {
      page_name: "contacts",
      contacts,
      view_type: "all_contacts",
      is_logged_in: req.session.is_logged_in,
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /contacts/create
 * @author Tanisha Sharma
 * @returns Render to "contacts" view
 */
router.get("/contacts/create", checkAuth, async function (req, res, next) {
  try {
    res.render("contacts", {
      page_name: "contacts",
      contact: null,
      view_type: "create",
      is_logged_in: req.session.is_logged_in,
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /contacts
 * @author Tanisha Sharma
 * @param {string} name.body.required - name
 * @param {string} phone.body.required - phone
 * @param {string} email.body.required - email
 * @returns Redirects to "/contacts"
 */
router.post("/contacts", checkAuth, async function (req, res, next) {
  try {
    const { name, phone, email } = req.body;
    await Contacts.create({
      name,
      phone,
      email,
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
});

/**
 * @route GET /contacts/edit/:id
 * @author Tanisha Sharma
 * @param {string} id.params.required - id
 * @returns Render to "contacts" view
 */
router.get("/contacts/edit/:id", checkAuth, async function (req, res, next) {
  try {
    const contact = await Contacts.findById(req.params.id);
    console.log(contact);
    res.render("contacts", {
      page_name: "contacts",
      contact: contact,
      view_type: "edit",
      is_logged_in: req.session.is_logged_in,
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /contacts/edit/:id
 * @author Tanisha Sharma
 * @param {string} id.params.required - id
 * @param {string} name.body.required - name
 * @param {string} phone.body.required - phone
 * @param {string} email.body.required - email
 * @returns Redirects to "/contacts"
 */
router.post("/contacts/edit/:id", checkAuth, async function (req, res, next) {
  try {
    const { name, phone, email } = req.body;
    await Contacts.findByIdAndUpdate(req.params.id, {
      $set: {
        name,
        phone,
        email,
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
});

/**
 * @route GET /contacts/delete/:id
 * @author Tanisha Sharma
 * @param {string} id.params.required - id
 * @returns Redirects to "/contacts"
 */
router.get("/contacts/delete/:id", checkAuth, async function (req, res, next) {
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
});

function checkAuth(req, res, next) {
  if (req.session.is_logged_in) {
    next();
  } else {
    req.session.message = {
      type: "danger",
      title: "Action denied",
      details: "Please login first",
    };
    res.redirect("/login");
  }
}

module.exports = router;
