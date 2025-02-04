const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');
const multer = require('multer');
const path  = require('path');
const shortid = require('shortid');

const {
    AdminrefreshToken,
    adminSignIn,
    resendEmailOtp,
    listAdmins,
    getAdminById,
    updateAdminEmail,
    deleteAdmin,
    adminPasswordReset,
    adminPasswordResetConfirm,
    updateAdminController,
    adminUpdateEmailVerified,
    updateAdminPassword,
    NewAdminRegisterController,
    NewAdminRegisterVerifiedController
  } = require("../controllers/adminController");




const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),'../backend/public/images/avatars')
    )
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

 /////////////////////

router.get('/protected',authMiddleware, permissionMiddleware('view_dashboard'), (req, res) => {
  res.json({ message: 'You have access to this resource!' });
});

///////////////

// create new admin
router.post('/create/sign-up',isAdminUserMiddleware,permissionMiddleware('admin-new-user-create'),NewAdminRegisterController);

/// create new admin verified to the email
router.put('/is_verified/phone/otp/:userOtp',isAdminUserMiddleware,permissionMiddleware('admin-new-user-create'),NewAdminRegisterVerifiedController);

//refresh admin token
router.post('/refresh/token',AdminrefreshToken);

//singin router
router.post('/signin',adminSignIn);

//resend email link 
router.get('/resend/email_otp/:id',resendEmailOtp);

// Get a list of all admins 
router.get('/get/all/admins',isAdminUserMiddleware,permissionMiddleware('admin-lists'), listAdmins);

// Get a single admin by ID
router.get('/get/single/admin/:id',isAdminUserMiddleware,permissionMiddleware('admin-info'), getAdminById);

// Update a admin by ID
router.put('/update/admin/profile/:id',  isAdminUserMiddleware,permissionMiddleware('admin-profile-update'),upload.single('avatar'),updateAdminController);

// Update a user email
router.put('/update/admin/email/address',isAdminUserMiddleware,permissionMiddleware('admin-profile-email-edit'), updateAdminEmail);

//admin update email verified
router.put('/update/admin/verified/email',isAdminUserMiddleware,isAdminMiddleware('admin-profile-email-edit'),adminUpdateEmailVerified);

// update admin password
router.put('/update/admin/password',isAdminUserMiddleware,permissionMiddleware('admin-profile-password-edit'),updateAdminPassword);

// Delete a admin by ID
router.delete('/delete/admin/:id',isAdminUserMiddleware,permissionMiddleware('admin-delete'), deleteAdmin);

// reset admin password in phone
router.put('/admin/password/reset', adminPasswordReset);

//reset admin password verified in phone
router.put('/admin/password/reset/verified',adminPasswordResetConfirm);




module.exports = router;
