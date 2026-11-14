// Teste UNITÁRIO: testa o armazenamento em memória, sem HTTP.
const repositorio = require('../src/repositories/tarefaRepository');

beforeEach(() => {
  repositorio.limpar();
});

describe('tarefaRepository (teste unitário)', () => {
  it('cria tarefas com ids sequenciais e concluida = false', () => {
    const a = repositorio.criar({ titulo: 'A' });
    const b = repositorio.criar({ titulo: 'B' });
    expect(a.id).toBe(1);
    expect(b.id).toBe(2);
    expect(a.concluida).toBe(false);
  });

  it('atualiza uma tarefa existente', () => {
    const tarefa = repositorio.criar({ titulo: 'A' });
    const atualizada = repositorio.atualizar(tarefa.id, { concluida: true });
    expect(atualizada.concluida).toBe(true);
  });

  it('retorna null ao atualizar um id que não existe', () => {
    expect(repositorio.atualizar(999, { concluida: true })).toBeNull();
  });

  it('remove uma tarefa e retorna false se ela já não existir', () => {
    const tarefa = repositorio.criar({ titulo: 'A' });
    expect(repositorio.remover(tarefa.id)).toBe(true);
    expect(repositorio.remover(tarefa.id)).toBe(false);
    expect(repositorio.listar()).toHaveLength(0);
  });
});
