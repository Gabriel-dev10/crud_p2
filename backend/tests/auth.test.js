const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database.sql');
const User = require('../src/models/sql/User');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de Autenticação (SQL)', () => {
  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nome: 'Teste User',
        email: 'test@example.com',
        senha: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('Deve realizar login com o usuário criado', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        senha: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Salva o token para outros testes
  });

  it('Não deve permitir login com senha errada', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        senha: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(401);
  });
});
