const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const infoSchema = new Schema({}, { collection: "info_logs", strict: false });

module.exports = model("info_log", infoSchema);
