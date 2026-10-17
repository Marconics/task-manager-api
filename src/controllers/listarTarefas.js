const repositorio = require('../repositories/tarefaRepository');

// GET /tarefas
function listarTarefas(req, res) {
  return res.json(repositorio.listar());
}

// GET /tarefas/:id
function buscarTarefa(req, res) {
  const tarefa = repositorio.buscarPorId(Number(req.params.id));
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }
  return res.json(tarefa);
}

module.exports = { listarTarefas, buscarTarefa };
