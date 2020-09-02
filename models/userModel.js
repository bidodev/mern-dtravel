/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', 'The name is required'],
  },
  email: {
    type: String,
    required: ['true', 'The email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please use a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: ['true', 'Please provide a password'],
    minlength: 10,
  },
  passwordConfirm: {
    type: String,
    required: ['true', 'Please provide a password'],
    validate: {
      //this only works on SAVE!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match",
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  //Only run this function if the password was modified.
  if (!this.isModified('password')) return next();

  //Has the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  //delete the passwordconfirm field.
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (jtwTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jtwTimestamp < changedTimeStamp;
  }

  //false means the user never changed the password
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
