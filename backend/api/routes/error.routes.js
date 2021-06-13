const router = require("express").Router();
const Error_Log = require("../models/error.model");

router.get("/", async (req, res, next) => {
  const data = await Error_Log.find({});
  res.status(200).json({ data: data });
});

module.exports = router;
