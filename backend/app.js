const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const db = require("mongoose");
const { db_url } = require("./api/config/mongo.config");

const PORT = process.env.PORT || 3000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

db.Promise = global.Promise;

db.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Database Connection Success!!");
    server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch((err) => console.log("Database Connection Error", err.message));

/** Logger - Start */

const logger = require("./api/middlewares/logger");

io.on("connection", (socket) => {
  // logger.info("Hello World", { id: socket.id });
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("message", (room, data) => {
    logger.log({
      level: "info",
      message: data,
    });
    socket.to(room).emit("receive", data);
  });

  socket.on("info", (data) => {
    logger.log({
      level: "info",
      message: data,
    });
  });

  socket.on("error", (data) => {
    logger.log({
      level: "error",
      message: data,
      private: true,
      meta: {
        response: "Test Meta",
        error: {
          message: "404 Not found",
        },
      },
    });
  });
});

/** Logger - End */

// Test Endpoint
app.use("/api/v1/server/status", (req, res, next) => {
  res
    .status(200)
    .json({ status: "success", message: `Server is running on PORT ${PORT}` });
});

/** Services */
const userRoute = require("./api/routes/user.routes");
app.use("/api/v1/user", userRoute);

const errorRoute = require("./api/routes/error.routes");
app.use("/api/v1/log/error", errorRoute);

const infoRoute = require("./api/routes/info.routes");
app.use("/api/v1/log/info", infoRoute);

/** Error Middleware */
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

/** Error Handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  let message = err.message;

  if (err.name === "ValidationError") {
    let fieldErrors = {};

    Object.keys(err.validate).forEach((key) => {
      fieldErrors[key] = err.validate[key].message;
    });
    message = fieldErrors;
  }
  res.send({
    error: {
      code: err.status || 500,
      message: message,
    },
  });
});
