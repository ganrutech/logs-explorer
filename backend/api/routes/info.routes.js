const router = require("express").Router();
const Info_Log = require("../models/info.model");

router.get("/", async (req, res, next) => {
  const data = await Info_Log.find({});
  res.status(200).json({ data: data });
});

module.exports = router;
