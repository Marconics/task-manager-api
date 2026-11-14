// Confere os dados de uma tarefa antes de salvar.
// Com { parcial: true } (usado na atualização), o título só é checado se vier no corpo.

function validarTarefa(dados, { parcial = false } = {}) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    return ['O corpo da requisição deve ser um objeto JSON.'];
  }

  const erros = [];
  const { titulo, descricao, concluida } = dados;

  if (!parcial || titulo !== undefined) {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      erros.push('O campo "titulo" é obrigatório e deve ser um texto.');
    }
  }

  if (descricao !== undefined && typeof descricao !== 'string') {
    erros.push('O campo "descricao" deve ser um texto.');
  }

  if (concluida !== undefined && typeof concluida !== 'boolean') {
    erros.push('O campo "concluida" deve ser true ou false.');
  }

  return erros;
}

module.exports = { validarTarefa };
