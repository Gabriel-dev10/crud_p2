const app = require('./app');
const mongoose = require('mongoose');
const sequelize = require('./config/database.sql');
const User = require('./models/sql/User');

if (app.set) {
  app.set('trust proxy', 1);
}

const PORT = process.env.PORT || 3000;

async function seedDefaultUser() {
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@email.com';
  const senha = process.env.DEFAULT_ADMIN_PASSWORD || 'senha123';
  const nome = process.env.DEFAULT_ADMIN_NAME || 'Administrador';

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { nome, email, senha }
  });

  if (created) {
    console.log(`Usuário padrão criado: ${user.email}`);
  }
}

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI não definida nas variáveis de ambiente.');
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso.');

    await sequelize.authenticate();
    await sequelize.sync();
    console.log('PostgreSQL/SQL conectado e sincronizado.');
    await seedDefaultUser();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
