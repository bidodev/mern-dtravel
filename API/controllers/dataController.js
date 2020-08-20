const Place = require('../models/placeModel');
const House = require('../models/houseModel');
const Experience = require('../models/experienceModel');
const AppError = require('../utils/appError');

//query for all the places
exports.getAllPlaces = async (req, res) => {

  try {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);
    let query = Place.find(queryObj);
   
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numberPlaces = await Place.countDocuments();
      if (skip >= numberPlaces) throw new Error('This page does not exist.');
    }

    const results = await query;

    //3. Sending the response.
    res.status(200).json({
      status: 'success',
      results: results.length,
      totalItems: await Place.countDocuments(),
      data: {
        results,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

//create a new place..
exports.createPlace = async (req, res) => {
  try {
    const newPlace = await Place.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        place: newPlace,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

//request only 1 place..
exports.getPlace = async (req, res, next) => {
  try {
    const { name } = req.params;

    const place = await Place.find({
      $or: [
        {
          productName: { $regex: `.*${name}.*` },
        },
        {
          type: { $regex: `.*${name}.*` },
        },
      ],
    });

    //if there is no place we return from this function, otherwise we will send 2 response ang get an error
    if (!place) {
      return next(
        new AppError(
          `Can't find id ${req.params.id} on the database.`,
          404,
          'fail'
        )
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        place,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

//update a place
exports.updatePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!place) {
      return next(
        new AppError(
          `Can't find id ${req.params.id} on the database.`,
          404,
          'fail'
        )
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        place,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

//delete a place
exports.deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return next(
        new AppError(
          `Can't find id ${req.params.id} on the database.`,
          404,
          'fail'
        )
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: err.message,
    });
  }
};

exports.getPlacesStats = async (req, res) => {
  try {
    const stats = await Place.aggregate([
      {
        $match: { ratingsAverange: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: err.message,
    });
  }
};

exports.getAllHouses = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);
    let query = House.find(queryObj);

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numberHouses = await House.countDocuments();
      if (skip >= numberHouses) throw new Error('This page does not exist.');
    }

    const results = await query;

    //3. Sending the response.
    res.status(200).json({
      status: 'success',
      results: results.length,
      data: {
        results,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createHouse = async (req, res, next) => {
  try {
    const newHouse = await House.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        place: newHouse,
      },
    });
  } catch (err) {
    return next(new AppError(`${err.message}`, '400', 'fail'));
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);
    let query = Experience.find(queryObj);

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numberExperiences = await Experience.countDocuments();
      if (skip >= numberExperiences)
        throw new Error('This page does not exist.');
    }

    const results = await query;

    //3. Sending the response.
    res.status(200).json({
      status: 'success',
      results: results.length,
      totalItems: await Experience.countDocuments(),
      data: {
        results,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createExperience = async (req, res, next) => {
  try {
    const newExperience = await Experience.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        experience: newExperience,
      },
    });
  } catch (err) {
    return next(new AppError(`${err.message}`, '400', 'fail'));
  }
};
