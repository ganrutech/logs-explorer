const { createLogger, format, transports } = require("winston");

const { timestamp, json } = format;

const ignorePrivate = format((info) => {
  if (info.private) {
    return false;
  }
  return info;
});

function devLogger() {
  return createLogger({
    transports: [
      new transports.Console({
        level: "info",
        //   filename: "info.log",
        defaultMeta: { service: "log-info" },
        format: format.combine(ignorePrivate(), timestamp(), json()),
      }),

      new transports.Console({
        level: "error",
        //   filename: "error.log",
        defaultMeta: { service: "log-error" },
        format: format.combine(timestamp(), json()),
      }),
    ],
  });
}

module.exports = devLogger;
