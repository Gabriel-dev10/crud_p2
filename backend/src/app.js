require('./config/crypto');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Rotas
const authRoutes = require('./routes/authRoutes');
const carroRoutes = require('./routes/carroRoutes');
const motoRoutes = require('./routes/motoRoutes');
const marcaRoutes = require('./routes/marcaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Boas práticas de Segurança - OWASP
app.use(helmet());
app.use(cors());

// Limite de requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requests por IP
});
app.use(limiter);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/carros', carroRoutes);
app.use('/api/motos', motoRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/users', userRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota de Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Middleware de Erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor!' });
});

module.exports = app;
