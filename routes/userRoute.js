const { viewProfile } = require("../controllers/userController");

const router = require("express").Router();

router.post("/1", viewProfile);

module.exports = router;
