/* File name: index.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

module.exports = {
  viewIndexPage: function (req, res, next) {
    res.render("index", {
      page_name: "home",
      is_logged_in: req.isAuthenticated(),
      user: req.session.user,
    });
  },
  viewAboutPage: function (req, res, next) {
    res.render("about", {
      page_name: "about",
      is_logged_in: req.isAuthenticated(),
      user: req.session.user,
    });
  },
  viewProjectsPage: function (req, res, next) {
    res.render("projects", {
      page_name: "projects",
      is_logged_in: req.isAuthenticated(),
      user: req.session.user,
    });
  },
  viewServicesPage: function (req, res, next) {
    res.render("services", {
      page_name: "services",
      is_logged_in: req.isAuthenticated(),
      user: req.session.user,
    });
  },
};
