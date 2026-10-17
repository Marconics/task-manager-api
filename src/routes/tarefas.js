const { Router } = require('express');
const criarTarefa = require('../controllers/criarTarefa');
const { listarTarefas, buscarTarefa } = require('../controllers/listarTarefas');

const router = Router();

router.post('/', criarTarefa);
router.get('/', listarTarefas);
router.get('/:id', buscarTarefa);

module.exports = router;
