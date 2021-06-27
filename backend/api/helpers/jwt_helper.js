const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  loginAccessToken: (data) => {
    return new Promise((resolve, reject) => {
      const payload = {
        email: data.email,
      };
      const options = {
        expiresIn: "1h",
        issuer: "ganrutech",
        audience: data.id,
      };
      const secret = process.env.JWT_TOKEN_SECRET;
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.verify(token, process.env.JWT_TOKEN_SECRET, (err, payload) => {
      if (err) {
        switch (err.name) {
          case "JsonWebTokenError":
            return next(createError.Unauthorized());

          case "TokenExpiredError":
            return next(createError.Unauthorized("Token Expired"));

          default:
            return next(createError.Unauthorized(err.message));
        }
      }
      req.payload = payload;
      next();
    });
  },
  loginRefreshToken: (data) => {
    return new Promise((resolve, reject) => {
      const payload = {
        email: data.email,
      };
      const options = {
        expiresIn: "1y",
        issuer: "ganrutech",
        audience: data.id,
      };
      const secret = process.env.JWT_REFRESH_SECRET;
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, payload) => {
          if (err) reject(createError.Unauthorized());
          const user = { ...payload, id: payload.aud };
          resolve(user);
        }
      );
    });
  },
};
