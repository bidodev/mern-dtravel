const Home = require('../models/homeModel');
const AppError = require('../utils/appError');

exports.getAllBackgrounds = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    const query = Home.find(queryObj);
    const backgrounds = await query;

    res.status(200).json({
      status: 'success',
      results: backgrounds.length,
      data: {
        backgrounds,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.createBackground = async (req, res, next) => {
  try {
    const query = Home.create(req.body);
    const background = await query;

    res.status(201).json({
      status: 'success',
      data: {
        background,
      },
    });
  } catch (error) {
    return next(new AppError(`${error.message}, 500, 'fail'`));
  }
};
