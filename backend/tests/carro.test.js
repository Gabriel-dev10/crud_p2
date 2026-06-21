const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sequelize = require('../src/config/database.sql');
const User = require('../src/models/sql/User');

let mongoServer;
let token;
let carroId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(process.env.MONGO_URI);

  await sequelize.sync({ force: true });

  const res = await request(app)
    .post('/api/auth/register')
    .send({
      nome: 'Carro Test User',
      email: 'carro@example.com',
      senha: 'password123'
    });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await sequelize.close();
});

describe('Testes do CRUD de Carros (NoSQL)', () => {
  it('Deve criar um carro', async () => {
    const res = await request(app)
      .post('/api/carros')
      .set('Authorization', `Bearer ${token}`)
      .send({
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2022,
        cor: 'Preto'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    carroId = res.body._id;
  });

  it('Deve listar todos os carros', async () => {
    const res = await request(app)
      .get('/api/carros')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar um carro', async () => {
    const res = await request(app)
      .put(`/api/carros/${carroId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ cor: 'Branco' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.cor).toEqual('Branco');
  });

  it('Deve remover um carro', async () => {
    const res = await request(app)
      .delete(`/api/carros/${carroId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
