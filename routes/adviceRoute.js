const {
  createAdvice,
  adviceDetails,
  allAdvice,
  upvoteAdvice,
  downvoteAdvice,
  advicesByUser,
} = require("../controllers/adviceController");

// Player router
const router = require("express").Router();
// const pageinateAdvices = require("./../_helper/pagination");

router.get("/", allAdvice);
router.post("/create", createAdvice);
router.post("/upvote", upvoteAdvice);
router.post("/downvote", downvoteAdvice);
router.post("/details", adviceDetails);
router.post("/by_user", advicesByUser);

module.exports = router;
