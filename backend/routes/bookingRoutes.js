const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware.js');
const {
    listBookings,
    getBookingById,
    getBookingByUserId,
    getBookingByWorkerId,
    updateBookingPaymentStatus,
    deleteBooking,
    updateBookingWorker,
    listNewBookings,
    getBookingByPaymentId,
    deleteBookingByPaymentId,
    getBookingPaymentStatus,
    deleteUserPersonalBooking

  } = require("../controllers/bookingController.js");
const permissionMiddleware = require('../middleware/permissionMiddleware.js');


const router = express.Router();


// Get a list of all bookings
router.get('/get/all/bookings',isAdminUserMiddleware,permissionMiddleware('booking-lists'), listBookings);


// Get a list of all bookings
router.get('/get/all/new/bookings',isAdminUserMiddleware,permissionMiddleware('booking-lists'), listNewBookings);

// Get a single booking by ID
router.get('/get/unique/booking/:id',isAdminUserMiddleware, getBookingById);

// Get  booking by user ID or client
router.get('/get/unique/user/booking/:userid', isAdminUserMiddleware, getBookingByUserId);

// Get  booking by worker ID 
router.get('/get/unique/worker/booking/:userid', isAdminUserMiddleware, getBookingByWorkerId);

// Update a booking payment status
router.put('/update/payment_status/:id',isAdminUserMiddleware, updateBookingPaymentStatus);

//get a booking payment status
router.get('/get/booking/payment_status/:status',isAdminUserMiddleware,permissionMiddleware('booking-payment-status-info'), getBookingPaymentStatus);

// Update or insert worker 
router.put('/update/booking/worker/:id',isAdminUserMiddleware,permissionMiddleware('booking-add-workers'), updateBookingWorker);

// Delete a booking by ID
router.delete('/delete/:id', isAdminUserMiddleware,permissionMiddleware('booking-delete'), deleteBooking);

///get booking by payment id
router.get('/get/booking/paymentid/:payid',isAdminUserMiddleware,permissionMiddleware('booking-by-payment-info'),getBookingByPaymentId);

///delete booking by payment id
router.delete('/delete/booking/paymentid/:payid',isAdminUserMiddleware,permissionMiddleware('booking-payment-delete'),deleteBookingByPaymentId);

///delete client personal bookings
router.delete('/delete/user/personal/booking/:id',isAdminUserMiddleware,deleteUserPersonalBooking);
module.exports = router;
