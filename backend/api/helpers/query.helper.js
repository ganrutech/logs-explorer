exports.commonFilter = async (req, res, next, Model) => {
  const { page, limit, select, search, ignoreID } = req.query;

  let pageVal = parseInt(page) > 0 ? page - 1 : 0;
  let skip = limit || 10;
  let onlyField = [];
  let query = {};
  let ignore = "";

  if (select) {
    onlyField = select.split(",");
  }

  if (ignoreID) {
    ignore = "-_id";
  }

  if (search) {
    query["$text"] = { $search: search };
  }

  try {
    await Model.find(query, ignore)
      .select(onlyField)
      .limit(parseInt(skip))
      .skip(limit * pageVal)
      .sort(req.query.sort)
      .exec((err, docs) => {
        if (err) {
          next(new Error(err.message));
        }
        Model.countDocuments(query).exec((count_error, count) => {
          if (err) {
            next(new Error(count_error.message));
          }
          return res.json({
            status: "success",
            total: count,
            page: pageVal + 1,
            pageSize: docs.length,
            data: docs,
          });
        });
      });
  } catch (err) {
    next(new Error(err.message));
  }
};

// Find by ID

exports.commonFindByID = async (req, res, next, Model) => {
  try {
    await Model.findById(req.params.id, function (err, doc) {
      if (err) {
        next(new Error(err.message));
      }

      if (doc) {
        res.status(200).json({
          status: "success",
          data: doc,
        });
      } else {
        res.status(404).json({
          data: "Not found",
        });
      }
    });
  } catch (e) {
    next(new Error(e.message));
  }
};

// Save new data

exports.commonSave = async (req, res, next, Model) => {
  try {
    const data = new Model(req.body);
    await data.save();

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      const err = new Error("Validation Error");
      err.name = e.name;
      err.status = 422;
      err.validate = e.errors;
      next(err);
    } else {
      const err = new Error(e.message);
      if (e.status) {
        err.status = e.status;
      }
      next(err);
    }
  }
};

// Delete by ID
exports.commonDeleteByID = async (req, res, next, Model) => {
  try {
    await Model.findByIdAndDelete(req.params.id, function (err, doc) {
      if (err) {
        next(new Error(err.message));
      }

      if (doc) {
        res.status(200).json({
          status: "success",
          data: doc,
        });
      } else {
        res.status(404).json({
          data: "Not found",
        });
      }
    });
  } catch (e) {
    next(new Error(e.message));
  }
};

// Update by ID

exports.commonUpdate = async (req, res, next, Model) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (data) {
      res.status(200).json({
        status: "success",
        data: data,
      });
    } else {
      res.status(404).json({
        data: "Not found",
      });
    }
  } catch (e) {
    if (e.name === "ValidationError") {
      const err = new Error("Validation Error");
      err.name = e.name;
      err.status = 422;
      err.validate = e.errors;
      next(err);
    } else {
      const err = new Error(e.message);
      if (e.status) {
        err.status = e.status;
      }
      next(err);
    }
  }
};
