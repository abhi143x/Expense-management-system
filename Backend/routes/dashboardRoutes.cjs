const express = require("express");
const { protect } = require("../middleware/authMiddleware.cjs");
const { getDashboardData }  = require("../controllers/dashboardController.cjs");

const router = express.Router();

router.get("/", protect, getDashboardData);

module.exports = router;