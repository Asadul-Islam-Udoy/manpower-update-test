const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware.js');
const {
    bookingReviewController,
    listReviews,
    deleteReview,
    getReviewBookingById
  } = require("../controllers/reviewController.js");
const permissionMiddleware = require('../middleware/permissionMiddleware.js');


const router = express.Router();

// Create a new review
router.put('/create/review/:bookingId',isAdminUserMiddleware,bookingReviewController)

// Get a list of all reviews
router.get('/get/all', listReviews);

//get review  booking by id
router.get('/get/review/booking/:bookingId',isAdminUserMiddleware,permissionMiddleware('review-info'), getReviewBookingById);


// Delete a review by ID
router.delete('/review/delete/:id',isAdminUserMiddleware,permissionMiddleware('review-delete'), deleteReview);

module.exports = router;
