const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const errorSchema = new Schema(
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
  { collection: "error_logs", strict: false }
);

module.exports = model("error_log", errorSchema);
