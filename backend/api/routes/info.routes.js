const router = require("express").Router();

const { getAllInfo, getInfo } = require("../controllers/logs/info.controller");

router.get("/", getAllInfo);
router.get("/:id", getInfo);

module.exports = router;
