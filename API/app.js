const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const cors = require('cors');

app.use(cors());

//error handling
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorController');

//load our routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const placesRouter = require('./routes/places');


// ADD THIS


//morgan logger
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routers handler
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/places', placesRouter);

//handling operational errors
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server.`, 404, 'fail')
  );
});

app.use(errorHandler);
module.exports = app;
