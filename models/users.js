/* File name: users.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
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

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
  
userSchema.methods.decryptPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("user",userSchema)