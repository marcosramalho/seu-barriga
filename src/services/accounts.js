module.exports = (app) => {
  const save = (account) => {
    return app.db('accounts').insert(account, '*');
  };

  const findAll = () => {
    return app.db('accounts').select();
  };

  const findOne = (filter = {}) => {
    return app.db('accounts').select().where(filter).first();
  };

  return { save, findAll, findOne };
};
