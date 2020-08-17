module.exports = (err, req, res, next) => {
  //console.log(err)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const errorObj = {
    status: err.status,
    message: err.message,
  };

  if (process.env.NODE_ENV === 'production') {
    if (err.isOperational) {
      return res.status(err.statusCode).json(errorObj);
    }
    //log tje error to the console
    // eslint-disable-next-line no-console
    console.error('ERROR', err);
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      ...errorObj,
      stack: err.stack,
      error: err,
    });
  }
};
