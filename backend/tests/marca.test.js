const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sequelize = require('../src/config/database.sql');

let mongoServer;
let token;
let marcaId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  await sequelize.sync({ force: true });

  const res = await request(app)
    .post('/api/auth/register')
    .send({
      nome: 'Marca Test User',
      email: 'marca@example.com',
      senha: 'password123'
    });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await sequelize.close();
});

describe('Testes do CRUD de Marcas de Roupa (NoSQL)', () => {
  it('Deve criar uma marca', async () => {
    const res = await request(app)
      .post('/api/marcas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Nike',
        fundador: 'Phil Knight',
        anoFundacao: 1964
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    marcaId = res.body._id;
  });

  it('Deve listar todas as marcas', async () => {
    const res = await request(app)
      .get('/api/marcas')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar uma marca', async () => {
    const res = await request(app)
      .put(`/api/marcas/${marcaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ anoFundacao: 1971 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.anoFundacao).toEqual(1971);
  });

  it('Deve remover uma marca', async () => {
    const res = await request(app)
      .delete(`/api/marcas/${marcaId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
