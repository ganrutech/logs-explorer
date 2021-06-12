const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
  },
  { versionKey: false }
);

userSchema.index({ firstname: "text", email: "text" });

module.exports = model("User", userSchema);
