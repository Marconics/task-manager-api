const repositorio = require('../repositories/tarefaRepository');
const { validarTarefa } = require('../validators/tarefaValidator');

// POST /tarefas
function criarTarefa(req, res) {
  const erros = validarTarefa(req.body);
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  const tarefa = repositorio.criar({
    titulo: req.body.titulo.trim(),
    descricao: req.body.descricao,
  });

  return res.status(201).json(tarefa);
}

module.exports = criarTarefa;
