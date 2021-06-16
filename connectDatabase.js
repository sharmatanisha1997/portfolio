require("./models/contacts");
require("./models/users");
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