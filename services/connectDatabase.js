/* File name: connectDatabase.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */
require("../models/contacts");
require("../models/users");
const mongoose = require("mongoose")

module.exports = function (uri) {
  mongoose.Promise = global.Promise
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .catch((err) => console.error(`mongoose throws ${err}`))
}