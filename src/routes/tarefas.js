const { Router } = require('express');
const criarTarefa = require('../controllers/criarTarefa');

const router = Router();

router.post('/', criarTarefa);

module.exports = router;
