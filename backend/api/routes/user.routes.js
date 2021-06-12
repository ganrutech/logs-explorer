const router = require("express").Router();

const {
  getAllUsers,
  createUser,
} = require("../controllers/user/user.controller");

router.get("/", getAllUsers);
router.post("/", createUser);

module.exports = router;
