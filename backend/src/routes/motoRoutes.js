/**
 * @swagger
 * tags:
 *   name: Motos
 *   description: Gerenciamento de Motos
 */

const express = require('express');
const router = express.Router();
const motoController = require('../controllers/motoController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * /api/motos:
 *   get:
 *     tags: [Motos]
 *     summary: Lista todas as motos
 *     responses:
 *       200:
 *         description: Sucesso
 *   post:
 *     tags: [Motos]
 *     summary: Cria uma moto
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
 *               cilindrada:
 *                 type: number
 *     responses:
 *       201:
 *         description: Criado
 * /api/motos/{id}:
 *   get:
 *     tags: [Motos]
 *     summary: Obtém uma moto pelo id
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
 *     tags: [Motos]
 *     summary: Atualiza uma moto
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
 *               cilindrada:
 *                 type: number
 *     responses:
 *       200:
 *         description: Atualizado
 *   delete:
 *     tags: [Motos]
 *     summary: Remove uma moto
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
  .get(motoController.getAll)
  .post(motoController.create);

router.route('/:id')
  .get(motoController.getById)
  .put(motoController.update)
  .delete(motoController.delete);

module.exports = router;
