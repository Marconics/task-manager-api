const { Router } = require('express');
const criarTarefa = require('../controllers/criarTarefa');
const { listarTarefas, buscarTarefa } = require('../controllers/listarTarefas');
const atualizarTarefa = require('../controllers/atualizarTarefa');
const deletarTarefa = require('../controllers/deletarTarefa');

const router = Router();

router.post('/', criarTarefa);
router.get('/', listarTarefas);
router.get('/:id', buscarTarefa);
router.put('/:id', atualizarTarefa);
router.delete('/:id', deletarTarefa);

module.exports = router;
