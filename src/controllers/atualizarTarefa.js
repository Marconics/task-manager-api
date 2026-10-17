const repositorio = require('../repositories/tarefaRepository');
const { validarTarefa } = require('../validators/tarefaValidator');

// PUT /tarefas/:id
// Aceita qualquer combinação de titulo, descricao e concluida.
function atualizarTarefa(req, res) {
  const id = Number(req.params.id);
  if (!repositorio.buscarPorId(id)) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }

  const erros = validarTarefa(req.body, { parcial: true });
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  const { titulo, descricao, concluida } = req.body;
  const dados = {};
  if (titulo !== undefined) dados.titulo = titulo.trim();
  if (descricao !== undefined) dados.descricao = descricao;
  if (concluida !== undefined) dados.concluida = concluida;

  if (Object.keys(dados).length === 0) {
    return res
      .status(400)
      .json({ erros: ['Envie ao menos um campo: titulo, descricao ou concluida.'] });
  }

  return res.json(repositorio.atualizar(id, dados));
}

module.exports = atualizarTarefa;
