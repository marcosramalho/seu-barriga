const request = require('supertest');

const app = require('../../src/app');

const email = `${Date.now()}@mail.com`;

test('Deve listar todos os usuários', () => {
  return request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir usuario com sucesso', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos Ramalho',
      email,
      password: '123456',
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Marcos Ramalho');
    });
});

test('Nao deve inserir usuario sem nome', () => {
  return request(app)
    .post('/users')
    .send({ email: 'mmm@email.com', password: '123456' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Nao deve inserir usuario sem email', async () => {
  const result = await request(app)
    .post('/users')
    .send({ name: 'Maria', password: '123456' });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Nao deve inserir usuario sem senha', (done) => {
  request(app)
    .post('/users')
    .send({ name: 'Maria', email: 'mmm@mail.com' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório');
      done();
    })
    .catch((error) => done.fail(error));
});

test('Nao deve inserir usuario com email existente', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos Ramalho',
      email,
      password: '123456',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com esse email');
    });
});
