/**
 * @swagger
 * tags:
 *   name: Carros
 *   description: Gerenciamento de Carros
 */

const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carroController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * /api/carros:
 *   get:
 *     tags: [Carros]
 *     summary: Lista todos os carros
 *     responses:
 *       200:
 *         description: Sucesso
 *   post:
 *     tags: [Carros]
 *     summary: Cria um carro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelo:
 *                 type: string
 *               marca:
 *                 type: string
 *               ano:
 *                 type: number
 *               cor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Criado
 * /api/carros/{id}:
 *   get:
 *     tags: [Carros]
 *     summary: Obtém um carro pelo id
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
 *     tags: [Carros]
 *     summary: Atualiza um carro
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
 *               modelo:
 *                 type: string
 *               marca:
 *                 type: string
 *               ano:
 *                 type: number
 *               cor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Atualizado
 *   delete:
 *     tags: [Carros]
 *     summary: Remove um carro
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
  .get(carroController.getAll)
  .post(carroController.create);

router.route('/:id')
  .get(carroController.getById)
  .put(carroController.update)
  .delete(carroController.delete);

module.exports = router;
