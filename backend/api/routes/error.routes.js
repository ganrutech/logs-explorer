const router = require("express").Router();
const {
  getAllError,
  getError,
} = require("../controllers/logs/error.controller");

router.get("/", getAllError);
router.get("/:id", getError);

module.exports = router;
