const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const infoSchema = new Schema(
  {
    level: {
      type: String,
    },
    message: {
      type: String,
    },
    meta: {
      type: Map,
    },
  },
  { collection: "info_logs", strict: false }
);

module.exports = model("info_log", infoSchema);
