const cors = require("cors");
const express = require("express");
const createError = require("http-errors");
require("dotenv").config();
require("./api/helpers/init_mongodb");
const logger = require("./api/middlewares/logger/index");

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
app.use(express.urlencoded({ extended: true }));

/** Logger - Start */

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

  socket.on("info", (room, data) => {
    const resData = {
      level: "info",
      message: data.message,
      meta: data.meta,
    };

    const timestamp = new Date().toISOString();
    logger.log(resData);

    socket.to(room).emit("receive", { ...resData, timestamp });
  });

  socket.on("error", (room, data) => {
    const resData = {
      level: "error",
      message: data.message,
      meta: data.meta,
      private: true,
    };

    const timestamp = new Date().toISOString();
    logger.log(resData);

    socket.to(room).emit("receive", { ...resData, timestamp });
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
const authRoutes = require("./api/routes/Auth.routes");
app.use("/api/v1/auth", authRoutes);

const userRoutes = require("./api/routes/user.routes");
app.use("/api/v1/user", userRoutes);

const errorRoutes = require("./api/routes/error.routes");
app.use("/api/v1/log/error", errorRoutes);

const infoRoutes = require("./api/routes/info.routes");
app.use("/api/v1/log/info", infoRoutes);

/** Error Middleware */
app.use((req, res, next) => {
  next(createError.NotFound());
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

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
