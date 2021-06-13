exports.uniqueValidator = (error, doc, next) => {
  const err = new Error(`${Object.keys(error.keyPattern)[0]} already exists`);
  err.status = 409;
  next(err);
};
