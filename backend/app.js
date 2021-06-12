const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const db = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

db.Promise = global.Promise;

db.connect(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:${process.env.MONGO_PORT}/logs_db?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useCreateIndex: true,
  }
)
  .then(() => {
    console.log("Database Connection Success!!");
    app.listen(PORT, () => console.log("Server is running..."));
  })
  .catch((err) => console.log("Database Connection Error", err.message));

// Test Endpoint
app.use("/api/v1/server/status", (req, res, next) => {
  res.status(200).json({ status: "success", message: "Running..." });
});

/** Services */
const userRoute = require("./api/routes/user.routes");
app.use("/api/v1/user", userRoute);

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
