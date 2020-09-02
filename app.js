const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
const cors = require('cors');

app.use(cors());

//error handling
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorController');

//load our routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data');

//morgan logger
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serving Static Files
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/data', dataRouter);

//routers handler
//app.use('/', indexRouter);

//handling operational errors
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server.`, 404, 'fail')
  );
});

app.use(errorHandler);
module.exports = app;
