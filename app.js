require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const contactMeRouter = require("./routes/contactMe");
const contactsRouter = require("./routes/contacts");
const MongoStore = require("connect-mongo");
const passport = require('passport')
const connectToDatabase = require("./services/connectDatabase");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

connectToDatabase(uri);
require('./passport/passportLocal.js')

const sessionStore = MongoStore.create({
  mongoUrl: uri,
  ttl: 14 * 24 * 60 * 60,
  crypto: {
    secret: process.env.SECRET,
  },
  collectionName: "sessions",
});

const app = express();
app.use((req, res, next) => {
  if (
    req.header("host").match(/heroku/gi) &&
    req.header("x-forwarded-proto") !== "https"
  ) {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    cookie: { maxAge: 1000 * 60 * 24 * 7 },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  })
);
app.use(passport.initialize())
app.use(passport.session())
// Flash messages middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static(path.join(__dirname, "public")));


function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.message = {
      type: "danger",
      title: "Access denied",
      details: "Please login first",
    };
    res.redirect("/login");
  }
}

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/contacts", checkAuth, contactsRouter);
app.use("/contact", contactMeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
