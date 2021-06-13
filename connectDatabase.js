require("./models/contacts");
require("./models/users");
const mongoose = require("mongoose")
 
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.Promise = global.Promise
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => console.error(`mongoose throws ${err}`))