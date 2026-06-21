const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sequelize = require('../src/config/database.sql');

let mongoServer;
let token;
let motoId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(process.env.MONGO_URI);

  await sequelize.sync({ force: true });

  const res = await request(app)
    .post('/api/auth/register')
    .send({
      nome: 'Moto Test User',
      email: 'moto@example.com',
      senha: 'password123'
    });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await sequelize.close();
});

describe('Testes do CRUD de Motos (NoSQL)', () => {
  it('Deve criar uma moto', async () => {
    const res = await request(app)
      .post('/api/motos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        modelo: 'Ninja',
        marca: 'Kawasaki',
        cilindrada: 600
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    motoId = res.body._id;
  });

  it('Deve listar todas as motos', async () => {
    const res = await request(app)
      .get('/api/motos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar uma moto', async () => {
    const res = await request(app)
      .put(`/api/motos/${motoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ cilindrada: 1000 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.cilindrada).toEqual(1000);
  });

  it('Deve remover uma moto', async () => {
    const res = await request(app)
      .delete(`/api/motos/${motoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
