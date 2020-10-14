module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.users.findAll().then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    try {
      const result = await app.services.users.save(req.body);
      return res.status(201).json(result[0]);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  return { findAll, create };
};
