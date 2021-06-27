const mongoose = require("mongoose");
const { db_url } = require("../config/mongo.config");

mongoose.Promise = global.Promise;

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Connection Success!!");
  })
  .catch((err) => console.log("Database Connection Error", err.message));

mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});
