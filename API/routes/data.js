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
  getAllExperiences,
  createExperience,
  getAllHouses,
  createHouse,
} = require('../controllers/dataController');

const {
  getAllBackgrounds,
  createBackground,
} = require('../controllers/homeController');

//const { protect } = require('../controllers/authController');

router.route('/places-stats').get(getPlacesStats);
router.route('/backgrounds').get(getAllBackgrounds).post(createBackground);

router.route('/places').get(getAllPlaces).post(createPlace);
//router.route('/experiences').get(getAllExperiences).post(createExperience);
router.route('/housings').get(getAllHouses).post(createHouse);
router.route('/:id').get(getPlace).delete(deletePlace).patch(updatePlace);

module.exports = router;
