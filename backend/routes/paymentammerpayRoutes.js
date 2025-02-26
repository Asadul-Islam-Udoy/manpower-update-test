const express = require('express');
const { 
    createPaymentControler, 
    listPaymentsController, 
    getPaymentByIdController,
    updatePaymentStatusController,
    deletePaymentController,
    statusPaymentsController,
    methodPaymentsController,
    getPaymentByUserController,
    successPaymentControler,
    failPaymentControler,
    cancelPaymentControler
} = require('../controllers/paymentAmmerPayController.js');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware.js');
const isAdminMiddleware = require('../middleware/AdminMiddleware.js');
const permissionMiddleware = require('../middleware/permissionMiddleware.js');
const router = express.Router();

// Create a new payment
router.post('/create',isAdminUserMiddleware, createPaymentControler);
///payment success
router.post('/success/:traidId/:appStatus',successPaymentControler);
///payment fail
router.post('/fail/:traidId/:appStatus',failPaymentControler);
///payment cancel
router.post('/cancel/:traidId/:appStatus',cancelPaymentControler);

// Get a list of all payments
router.get('/get/all', isAdminUserMiddleware,permissionMiddleware('invoices-balances-lists'), listPaymentsController);

//get payment status base
router.get('/get/payment/status', isAdminUserMiddleware,permissionMiddleware('invoices-balances-lists-status'), statusPaymentsController);

//get payment method base
router.get('/get/payment/method', isAdminUserMiddleware,permissionMiddleware('invoices-balances-lists-method'), methodPaymentsController);

// Get a single payment by ID
router.get('/get/single/:id', isAdminUserMiddleware,getPaymentByIdController);

// Get a  payment  by User
router.get('/get/payment_by_user/:id', isAdminUserMiddleware,getPaymentByUserController);

// Update payment status a payment by ID
router.put('/update/payment/status/:id', isAdminUserMiddleware,isAdminMiddleware('invoices-balances-update-payment-status'),updatePaymentStatusController);

// Delete a payment by ID
router.delete('/delete/:id', isAdminUserMiddleware,permissionMiddleware('invoices-balances-delete'),deletePaymentController);

module.exports = router;
