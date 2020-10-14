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

test('Nao deve inserir uma conta sem nome', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test.skip('Nao deve inserir uma conta de nome duplicado para o mesmo usuário', () => {});

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

test.skip('Deve listar apenas as contas do usuario', () => {});

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

test.skip('Nao deve retornar uma conta de outro usuario', () => {});

test('Deve alterar uma conta', () => {
  return app
    .db('accounts')
    .insert({ name: 'Acc by update', user_id: user.id }, ['id'])
    .then((account) => {
      return request(app)
        .put(`${MAIN_ROUTE}/${account[0].id}`)
        .send({ name: 'Acc Updated' });
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Acc Updated');
    });
});

test.skip('Nao deve alterar conta de outro usuario', () => {});

test('Deve remover uma conta', () => {
  return app
    .db('accounts')
    .insert({ name: 'Acc remove', user_id: user.id }, ['id'])
    .then((acc) => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test.skip('Nao deve remover conta de outro usuario', () => {});
