const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { ElasticsearchTransport } = require("winston-elasticsearch");

const { timestamp, json } = format;

const ignorePrivate = format((info) => {
  if (info.private) {
    return false;
  }
  return info;
});

// Filetransport
var fileTransport = new transports.DailyRotateFile({
  dirname: "logs",
  filename: "logs-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "1d",
});

const esTransportOpts = {
  level: "info",
  clientOpts: {
    node: `http://elasticsearch:9200`,
  },
  indexPrefix: process.env.ELK_INDEX_DEV,
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

// esTransport.on("warning", (error) => {
//   console.error("Error caught", error);
// });

function devLogger() {
  return createLogger({
    transports: [
      fileTransport,
      esTransport,
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
