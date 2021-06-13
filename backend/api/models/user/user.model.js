const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { uniqueValidator } = require("../../helpers/validation.helper");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is Required"],
      validate: {
        validator: function (v) {
          return !/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi.test(v);
        },
        message: (props) =>
          `${props.value} contains special characters. Except Hypen(-)`,
      },
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ firstname: "text", email: "text" });

userSchema.path("email").validate(function (value) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  if (!emailRegex.test(value)) {
    throw new Error("Invalid email address");
  }
  return true;
}, "email is required");

userSchema.post("save", function (error, doc, next) {
  // Unique Field Validation
  if (error.name === "MongoError" && error.code === 11000) {
    uniqueValidator(error, doc, next);
  } else {
    next(error);
  }
});

userSchema.post("findOneAndUpdate", function (error, doc, next) {
  // Unique Field Validation
  if (error.name === "MongoError" && error.code === 11000) {
    uniqueValidator(error, doc, next);
  } else {
    next(error);
  }
});

module.exports = model("User", userSchema);
