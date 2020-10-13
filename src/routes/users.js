module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.users.findAll().then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    const result = await app.services.users.save(req.body);
    res.status(201).json(result[0]);
  };

  return { findAll, create };
};
