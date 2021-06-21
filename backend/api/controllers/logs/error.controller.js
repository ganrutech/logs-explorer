const Error_Log = require("../../models/error.model");

const { commonFilter, commonFindByID } = require("../../helpers/query.helper");

exports.getAllError = (req, res, next) => {
  commonFilter(req, res, next, Error_Log);
};

exports.getError = (req, res, next) => {
  commonFindByID(req, res, next, Error_Log);
};
