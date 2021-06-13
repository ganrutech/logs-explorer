var MongoClient = require("mongodb").MongoClient;

// Connection URL
exports.db_url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

var state = {
  db: null,
};

exports.connect = function (url, done) {
  if (state.db) return done();

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) return done(err);
    console.log(db.collection("errors"));
    state.db = db;
    done();
  });
};

exports.get = function () {
  return state.db;
};

exports.close = function (done) {
  if (state.db) {
    state.db.close(function (err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};
