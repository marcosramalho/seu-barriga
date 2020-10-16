module.exports = (app) => {
  const create = (req, res, next) => {
    app.services.accounts
      .save(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      })
      .catch((error) => next(error));
  };

  const findAll = (req, res, next) => {
    app.services.accounts
      .findAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  };

  const findOne = (req, res, next) => {
    app.services.accounts
      .findOne({ id: req.params.id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  };

  const update = (req, res, next) => {
    app.services.accounts
      .update(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((error) => next(error));
  };

  const remove = (req, res, next) => {
    app.services.accounts
      .remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => next(error));
  };

  return {
    create,
    findAll,
    findOne,
    update,
    remove,
  };
};
