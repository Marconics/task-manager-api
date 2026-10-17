const repositorio = require('../repositories/tarefaRepository');

// DELETE /tarefas/:id
function deletarTarefa(req, res) {
  const removida = repositorio.remover(Number(req.params.id));
  if (!removida) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }
  return res.status(204).send();
}

module.exports = deletarTarefa;
