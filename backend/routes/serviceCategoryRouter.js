const express = require("express");
const isAdminUserMiddleware = require("../middleware/AdminUserMiddleware");
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');
const {
  serviceCategoryCreate,
  getAllServiceCategories,
  serviceCategoryUpdate,
  serviceCategoryDelete,
  getSingleServiceCategory,
  getParentCategoryController,
} = require("../controllers/serviceCategoryController");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const router = express.Router();

// Create a new service category

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname),'../backend/public/images/services_categories'))
  },
  filename: function (req, file, cb) {
    cb(null, shoriid.generate()+ '-' + file.originalname)
  }
})


const upload = multer({ storage: storage });

router.post(
  "/create",
  isAdminUserMiddleware,
  permissionMiddleware("service-category-create"),upload.fields([{name:'frontImage',maxCount:1},{name:'backImage',maxCount:1}]),
  serviceCategoryCreate
);

// Get a list of all service categories
router.get("/get/all", getAllServiceCategories);
// Get a list of all service categories
router.get("/get/all/parent", getParentCategoryController);
// Get a single service category
router.get("/get/single/:id", getSingleServiceCategory);

// Update a service category
router.put(
  "/update/:id",
  isAdminUserMiddleware,
  permissionMiddleware("service-category-update"),
  upload.fields([{name:'frontImage',maxCount:1},{name:'backImage',maxCount:1}]),
  serviceCategoryUpdate
);

// Delete service category
router.delete(
  "/delete/:id",
  isAdminUserMiddleware,
  permissionMiddleware("service-category-delete"),
  serviceCategoryDelete
);

module.exports = router;
