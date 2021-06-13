const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model("user",userSchema)