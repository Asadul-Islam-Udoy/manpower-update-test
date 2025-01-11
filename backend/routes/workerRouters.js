const express = require('express');
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const { 
    updateWorkerProfile,
    getAllWorkerProfile,
    getUniqueWorkerProfile,
    updateWorkerProfileAvatar,
    findServiceToWorkersController,
    findWorkersToServicesController,
    updateWorkerIsFreeController,
    getAllDivisionController,
    getDistrictByDivisionIdController,
    getUpazilaByDistrictIdController
 } = require('../controllers/workerController');
const { applyWorkerController, getApplyAllResumeController, getApplySingleResumeController, deleteResumeWorkerController, arupWorkerResumeController } = require('../controllers/workerResumeController');
const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../backend/public/images/avatars'))
    },
    filename: function (req, file, cb) {
      cb(null, shoriid.generate()+ '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });


const storageresume = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname),'../backend/public/images/workerresume'))
  },
  filename: function (req, file, cb) {
    cb(null, shoriid.generate()+ '-' + file.originalname)
  }
})

const uploadresume = multer({ storage: storageresume });


//update worker profile 
router.put('/update/worker/profile/:workerid',isAdminUserMiddleware,isAdminMiddleware('admin'),updateWorkerProfile);

//update worker profile avatar 
router.put('/update/avatar/worker/profile/:workerid',isAdminUserMiddleware,upload.single('avatar'),updateWorkerProfileAvatar);

//update is is freee
router.put('/worker/is/free/:profileId',updateWorkerIsFreeController);

//get all worker profile
router.get('/get/all',getAllWorkerProfile);

//get unique client profile
router.get('/get/unique/worker/profile/:userid',getUniqueWorkerProfile);

//find services workers
router.get('/find/services/workers/:serviceId',findServiceToWorkersController);

//find  workers services
router.get('/find/workers/services/:profileId', findWorkersToServicesController);

//get all division
router.get('/get/all/divisions', isAdminUserMiddleware, isAdminMiddleware('admin'), getAllDivisionController);

//get all district by division id
router.get('/get/all/districts/:id', isAdminUserMiddleware, isAdminMiddleware('admin'), getDistrictByDivisionIdController);

//get all upazila by district id
router.get('/get/all/upazilas/:id', isAdminUserMiddleware, isAdminMiddleware('admin'), getUpazilaByDistrictIdController);

////apply worker
router.post('/apply/worker', isAdminUserMiddleware,uploadresume.single('resume'),applyWorkerController);

///get all resume
router.get('/get/all/resumes',isAdminUserMiddleware,isAdminMiddleware('admin'),getApplyAllResumeController);

///get single resume
router.get('/get/single/resume/:userid',isAdminUserMiddleware,getApplySingleResumeController);
/// ruser resume arup
router.put('/resume/arup/:userid',isAdminUserMiddleware,isAdminMiddleware('admin'),arupWorkerResumeController)
///get delete resume
router.delete('/delete/resume/:userid',isAdminUserMiddleware,isAdminMiddleware('admin'),deleteResumeWorkerController);

module.exports = router;