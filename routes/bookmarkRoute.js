const {
  bookmarkAdvice,
  getBookedMarkAdvice,
} = require("../controllers/bookmarkController");

const router = require("express").Router();

router.post("/", bookmarkAdvice);
router.post("/list", getBookedMarkAdvice);

module.exports = router;
