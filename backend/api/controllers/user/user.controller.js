const User = require("../../models/user/user.model");
const {
  commonFilter,
  commonSave,
  commonFindByID,
  commonDeleteByID,
  commonUpdate,
} = require("../../helpers/query.helper");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  commonFilter(req, res, next, User);
};

// Get one user
exports.getUser = async (req, res, next) => {
  commonFindByID(req, res, next, User);
};

// Create new user
exports.createUser = async (req, res, next) => {
  commonSave(req, res, next, User);
};

// Update user
exports.updateUser = async (req, res, next) => {
  commonUpdate(req, res, next, User);
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  commonDeleteByID(req, res, next, User);
};
