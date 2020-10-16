module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.users
      .findAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  };

  const create = async (req, res, next) => {
    try {
      const result = await app.services.users.save(req.body);
      return res.status(201).json(result[0]);
    } catch (error) {
      return next(error);
    }
  };

  return { findAll, create };
};
