const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const errorSchema = new Schema({}, { collection: "error_logs", strict: false });

module.exports = model("error_log", errorSchema);
