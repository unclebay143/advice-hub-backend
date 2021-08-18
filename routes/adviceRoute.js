const {
  createAdvice,
  adviceDetails,
  allAdvice,
  upvoteAdvice,
} = require("../controllers/adviceController");

// Player router
const router = require("express").Router();
// const pageinateAdvices = require("./../_helper/pagination");

router.get("/", allAdvice);
router.post("/create", createAdvice);
router.post("/upvote", upvoteAdvice);
router.post("/details", adviceDetails);

module.exports = router;
