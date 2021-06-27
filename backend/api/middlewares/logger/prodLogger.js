const { createLogger, format, transports } = require("winston");
const { timestamp, json } = format;

require("winston-mongodb");
const { db_url } = require("../../config/mongo.config");

const ignorePrivate = format((info) => {
  if (info.private) {
    return false;
  }
  return info;
});

function prodLogger() {
  return createLogger({
    transports: [
      new transports.MongoDB({
        level: "info",
        db: db_url,
        options: { useUnifiedTopology: true },
        collection: "info_logs",
        format: format.combine(ignorePrivate(), timestamp(), json()),
        metaKey: "meta",
      }),

      new transports.MongoDB({
        level: "error",
        db: db_url,
        options: { useUnifiedTopology: true },
        collection: "error_logs",
        format: format.combine(timestamp(), json()),
        metaKey: "meta",
      }),
    ],
  });
}

module.exports = prodLogger;
