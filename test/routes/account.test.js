const request = require('supertest');

const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  const res = await app.services.users.save({
    name: 'User Account',
    email: `${Date.now()}@mail.com`,
    password: '123445',
  });
  user = { ...res[0] };
});

test('Deve inserir uma conta com sucesso', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});

test('Deve listar todas as contas', () => {
  return app
    .db('accounts')
    .insert({ name: 'Acc list', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve retornar uma conta por ID', () => {
  return app
    .db('accounts')
    .insert({ name: 'Acc by ID', user_id: user.id }, ['id'])
    .then((account) => request(app).get(`${MAIN_ROUTE}/${account[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Acc by ID');
      expect(res.body.user_id).toBe(user.id);
    });
});
