const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError.js');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return next(new AppError(`${err.message}`, 404, 'fail'));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1. check if email and password exist.
  if (!email || !password) {
    return next(new AppError(`Please provide email and password`, 400, 'fail'));
  }

  //2. check if the user exist and password is correct
  const user = await User.findOne({ email });

  //3. if no user or password is incorrect, return from this function
  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError(`Credentials don't match`, 401, 'fail'));
  }

  //4. If everything is okay send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token;
    // 1 Getting token and check if it's there.
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }
    //2 Validate token.
    if (!token) {
      return next(new AppError(`You are not logged in`, 401, 'fail'));
    }

    // verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //3 Check if the user still exists.
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return next(new AppError(`The user does not longer exist.`, 401, 'fail'));
    }

    //4 Check if user changed password after the token was issued.
    if (freshUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          `User recently changed password! Please log in again`,
          401,
          'fail'
        )
      );
    }

    next();
  } catch (err) {
    return next(new AppError(`${err.message}`, 401, 'fail'));
  }
};
