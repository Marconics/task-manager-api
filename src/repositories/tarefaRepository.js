// Armazenamento das tarefas em memória.
// Decisão Lean: no MVP não usamos banco de dados. Os dados somem quando a API
// reinicia, mas isso basta para validar o CRUD. Persistência fica no backlog.

let tarefas = [];
let proximoId = 1;

function listar() {
  return tarefas;
}

function buscarPorId(id) {
  return tarefas.find((tarefa) => tarefa.id === id);
}

function criar({ titulo, descricao = '' }) {
  const agora = new Date().toISOString();
  const tarefa = {
    id: proximoId++,
    titulo,
    descricao,
    concluida: false,
    criadaEm: agora,
    atualizadaEm: agora,
  };
  tarefas.push(tarefa);
  return tarefa;
}

function atualizar(id, dados) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;
  Object.assign(tarefa, dados, { atualizadaEm: new Date().toISOString() });
  return tarefa;
}

function remover(id) {
  const indice = tarefas.findIndex((tarefa) => tarefa.id === id);
  if (indice === -1) return false;
  tarefas.splice(indice, 1);
  return true;
}

// Usado pelos testes para começar cada caso com a lista vazia.
function limpar() {
  tarefas = [];
  proximoId = 1;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover, limpar };
