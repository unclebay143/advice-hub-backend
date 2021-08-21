const {
  bookmarkAdvice,
  getBookedMarkAdvice,
  removeBookmarkAdvice,
} = require("../controllers/bookmarkController");

const router = require("express").Router();

router.post("/", bookmarkAdvice);
router.post("/remove", removeBookmarkAdvice);
router.post("/list", getBookedMarkAdvice);

module.exports = router;
