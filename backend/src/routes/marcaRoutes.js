/**
 * @swagger
 * tags:
 *   name: MarcasRoupa
 *   description: Gerenciamento de Marcas de Roupa
 */

const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * /api/marcas:
 *   get:
 *     tags: [MarcasRoupa]
 *     summary: Lista todas as marcas
 *     responses:
 *       200:
 *         description: Sucesso
 *   post:
 *     tags: [MarcasRoupa]
 *     summary: Cria uma marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               fundador:
 *                 type: string
 *               anoFundacao:
 *                 type: number
 *     responses:
 *       201:
 *         description: Criado
 * /api/marcas/{id}:
 *   get:
 *     tags: [MarcasRoupa]
 *     summary: Obtém uma marca pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *   put:
 *     tags: [MarcasRoupa]
 *     summary: Atualiza uma marca
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               fundador:
 *                 type: string
 *               anoFundacao:
 *                 type: number
 *     responses:
 *       200:
 *         description: Atualizado
 *   delete:
 *     tags: [MarcasRoupa]
 *     summary: Remove uma marca
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removido
 */
router.route('/')
  .get(marcaController.getAll)
  .post(marcaController.create);

router.route('/:id')
  .get(marcaController.getById)
  .put(marcaController.update)
  .delete(marcaController.delete);

module.exports = router;
