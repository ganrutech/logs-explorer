const User = require("../../models/user/user.model");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(new Error(err.message));
  }
};

// Create new user
exports.createUser = async (req, res, next) => {
  try {
    const users = new User(req.body);
    await users.save();

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      const err = new Error("Validation Error");
      err.name = e.name;
      err.status = 422;
      err.validate = e.errors;
      next(err);
    } else {
      next(new Error(error.message));
    }
  }
};
