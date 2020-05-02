const express = require("express");
const {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompaniesInRadius,
    companyPhotoUpload
} = require("../controllers/companies");

const Company = require("../models/Company");

// Include other resource routers
const jobRouter = require("./jobs");
// const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:CompanyId/jobs", jobRouter);
// router.use("/:bootcampId/reviews", reviewRouter);

// router.route("/radius/:zipcode/:distance").get(getCompaniesInRadius);

router
    .route("/:id/photo")
    .put(protect, authorize("employer", "admin"), companyPhotoUpload);

router
    .route("/")
    .get(advancedResults(Company, "jobs"), getCompanies)
    .post(protect, authorize("employer", "admin"), createCompany);

router
    .route("/:id")
    .get(getCompany)
    .put(protect, authorize("employer", "admin"), updateCompany)
    .delete(protect, authorize("employer", "admin"), deleteCompany);

module.exports = router;
