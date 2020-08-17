const express = require('express');

const router = express.Router();

//import all the functions
const {
  getAllPlaces,
  createPlace,
  getPlace,
  deletePlace,
  updatePlace,
  getPlacesStats,
} = require('../controllers/placeController');

const { protect } = require('../controllers/authController');

router.route('/places-stats').get(getPlacesStats);

router.route('/').get(getAllPlaces).post(createPlace);
router.route('/:id').get(getPlace).delete(deletePlace).patch(updatePlace);

module.exports = router;
