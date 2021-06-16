/* File name: passportLocal.js
 * Student's Name: Tanisha Sharma
 * StudentID: 301144152
 * Date: 2021/06/16
 */

const passport = require('passport')
const Users = require('../models/users')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  Users.findById(id, (err,user)=>{
    done(err,user)
  })
})

passport.use('local-signup',new LocalStrategy({
  usernameField:'username',
  passwordField:'password',
  emailField:'email',
  passReqToCallback:true
}, (req,username,password,done) =>{
  Users.findOne({$or:[{username: { $regex: new RegExp(`^${username.toLowerCase()}$`, "i") }},{email: { $regex: new RegExp(`^${email.toLowerCase()}$`, "i") },}]}, (err,user)=>{
    if(err){
      return done(err)
    }

    if(user){
      return done(null,false, { 'error' : { 'message' : 'A user already exists with this username/email' } })
    }

    const newUser = new Users()
    newUser.username = req.body.username
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.dob = req.body.dob
    newUser.address = req.body.address
    newUser.password = newUser.encryptPassword(req.body.password)

    newUser.save(err=>{
      done(null,newUser)
    })
  })
}))


passport.use('local-signin', new LocalStrategy({
  usernameField:'username',
  passwordField:'password',
  passReqToCallback:true
}, (req,username,password,done) =>{
  Users.findOne({username: { $regex: new RegExp(`^${username.toLowerCase()}$`, "i") }}, (err,user)=>{
    if(err){
      return done(err)
    }
    if(!user){
      return done(null,false, { 'error' : { 'message' : 'No user account exists with this username' } })
    }

    if(user && !user.decryptPassword(password)){
      return done(null,false, { 'error' : { 'message' : 'Password used is incorrect' } })
    }

    if(user && user.decryptPassword(password)){
      return done(err,user)
    }

  })
}))