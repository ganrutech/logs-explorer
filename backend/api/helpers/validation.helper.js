const createError = require("http-errors");

exports.uniqueValidator = (error, doc, next) => {
  next(
    createError.Conflict(`${Object.keys(error.keyPattern)[0]} already exists`)
  );
};
