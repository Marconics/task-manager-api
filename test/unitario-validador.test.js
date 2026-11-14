// Teste UNITÁRIO: testa só a função de validação, sem subir o servidor.
const { validarTarefa } = require('../src/validators/tarefaValidator');

describe('validarTarefa (teste unitário)', () => {
  it('aceita uma tarefa com título', () => {
    expect(validarTarefa({ titulo: 'Estudar' })).toEqual([]);
  });

  it('recusa título vazio ou só com espaços', () => {
    expect(validarTarefa({ titulo: '   ' })).not.toEqual([]);
  });

  it('recusa "concluida" que não é booleano', () => {
    expect(validarTarefa({ titulo: 'X', concluida: 'sim' })).not.toEqual([]);
  });

  it('recusa corpo que não é um objeto', () => {
    expect(validarTarefa(null)).not.toEqual([]);
    expect(validarTarefa([])).not.toEqual([]);
  });

  it('na atualização parcial, aceita objeto sem título', () => {
    expect(validarTarefa({ concluida: true }, { parcial: true })).toEqual([]);
  });
});
