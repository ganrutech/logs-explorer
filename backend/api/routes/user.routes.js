const router = require("express").Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user/user.controller");

router.get("/", verifyAccessToken, getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
