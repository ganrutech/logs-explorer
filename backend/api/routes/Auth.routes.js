const router = require("express").Router();

const { login, refreshAuthToken } = require("../controllers/Auth.controller");

router.post("/login", login);
router.post("/refresh-token", refreshAuthToken);

module.exports = router;
