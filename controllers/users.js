/* File name: users.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */
const passport = require("passport")

module.exports = {
  viewLoginPage: function (req, res, next) {
    if (req.isAuthenticated()) return res.redirect("/contacts");
    res.render("login", {
      page_name: "login",
      is_logged_in: req.isAuthenticated(),
      user: req.session.user,
    });
  },
  signup: (req, res) => {
    passport.authenticate("local-signup", function (err, user, info) {
      if (err) {
        req.session.message = {
          type: "danger",
          title: "Action failed",
          details: err.message,
        };
        return res.redirect("back");
      }
      if (info) {
        req.session.message = {
          type: "danger",
          title: "Action failed",
          details: info.error.message,
        };
        return res.redirect("back");
      } else if (user && !err && !info) {
        res.redirect('/login')
      }
    })(req, res);
  },
  login: (req, res, next) => {
    passport.authenticate("local-signin", function (err, user, info) {
      if (err) {
        req.session.message = {
          type: "danger",
          title: "Action failed",
          details: err.message,
        };
        return res.redirect("back");
      }
      if (info) {
        req.session.message = {
          type: "danger",
          title: "Action failed",
          details: info.error.message,
        };
        return res.redirect("back");
      } else if (user && !err && !info) {
        req.logIn(user, (err) => {
          if (err) {
            req.session.message = {
              type: "danger",
              title: "Action failed",
              details: err.message,
            };
            return res.redirect("back");
          }
          req.session.message = {
            type: "success",
            title: "Login successful",
            details: "You have been logged in successfully",
          };
          return res.redirect("/contacts");
        });
      }
    })(req, res);
  },
  logout: function (req, res) {
    if (req.isAuthenticated()) {
      Promise.resolve(
        req.session.destroy((err) => {
          if (err) {
            req.session.message = {
              type: "danger",
              title: "Action failed",
              details: err.message,
            };
            return res.redirect("back");
          }
          console.log("---> destroying session");
          req.logOut();
          console.log("---> logged out");
          req.user = null;
        })
      ).then(() => {
        console.log("promise resolved");
        return res.redirect("/login")
      });
    } else {
      return res.redirect("back");
    }
  },
};
