const logger = require("../middlewares/logger");

function nodeAppLogger(req, res, next) {
  // const message = `HTTP '${req.method}' ${req.originalUrl} responded ${res.statusCode} `;
  // logger.info(message);

  let oldSend = res.send;
  res.send = function (data) {
    if (typeof data === "string") {
      const message = `HTTP ${req.method} ${req.originalUrl} responded ${res.statusCode}`;
      logger.info(message, {
        response: {
          originalUrl: req.originalUrl,
          method: req.method,
          statusCode: res.statusCode,
          body: JSON.parse(data),
        },
      });
    }
    oldSend.apply(res, arguments);
  };
  next();
}

module.exports = nodeAppLogger;
