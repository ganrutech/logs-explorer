const User = require("../models/user/user.model");
const createError = require("http-errors");
const {
  loginAccessToken,
  loginRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!req.body.email || !req.body.password) {
      throw createError.BadRequest();
    }

    const user = await User.findOne({ email: email });
    if (!user) throw createError.NotFound(`${email} is not registered`);

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) throw createError.Unauthorized("Invalid Email or Password");

    const accessToken = await loginAccessToken(user);
    const refreshToken = await loginRefreshToken(user);

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

exports.refreshAuthToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();
    const user = await verifyRefreshToken(refreshToken);
    const accessToken = await loginAccessToken(user);
    const refToken = await loginRefreshToken(user);

    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (err) {
    next(err);
  }
};
