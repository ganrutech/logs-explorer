const Info_Log = require("../../models/info.model");

const { commonFilter, commonFindByID } = require("../../helpers/query.helper");

exports.getAllInfo = (req, res, next) => {
  commonFilter(req, res, next, Info_Log);
};

exports.getInfo = (req, res, next) => {
  commonFindByID(req, res, next, Info_Log);
};
