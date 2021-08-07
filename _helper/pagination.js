module.exports = function paginateAdvices(adviceModel) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    // Check length of the result
    if (endIndex < (await adviceModel.length())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      res.paginatedResult = result;
      next();
    } catch (error) {
      console.log(error);
    }
  };
};
