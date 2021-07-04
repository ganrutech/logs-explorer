const { createLogger, format, transports } = require("winston");
const { timestamp, json } = format;
require("winston-daily-rotate-file");
const { ElasticsearchTransport } = require("winston-elasticsearch");

require("winston-mongodb");
const { db_url } = require("../../config/mongo.config");

const ignorePrivate = format((info) => {
  if (info.private) {
    return false;
  }
  return info;
});

// Filetransport
var fileTransport = new transports.DailyRotateFile({
  dirname: "logs",
  filename: `${process.env.ELK_INDEX_PROD}-logs-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  maxFiles: "1d",
});

const esTransportOpts = {
  level: "info",
  clientOpts: {
    node: process.env.ELK_HOST,
    auth: {
      username: process.env.ELK_AUTH_USER,
      password: process.env.ELK_AUTH_PASSWORD,
    },
  },
  indexPrefix: process.env.ELK_INDEX_PROD,
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

function prodLogger() {
  return createLogger({
    transports: [
      fileTransport,
      esTransport,

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
