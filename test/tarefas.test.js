const request = require('supertest');
const app = require('../src/app');
const repositorio = require('../src/repositories/tarefaRepository');

// Cada teste começa com a lista de tarefas vazia.
beforeEach(() => {
  repositorio.limpar();
});

async function criar(dados = { titulo: 'Estudar para a prova' }) {
  return request(app).post('/tarefas').send(dados);
}

describe('GET /health', () => {
  it('responde que a API está no ar', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /tarefas', () => {
  it('cria uma tarefa nova', async () => {
    const res = await criar({ titulo: '  Fazer o seminário  ', descricao: 'Slides e GitHub' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      titulo: 'Fazer o seminário',
      descricao: 'Slides e GitHub',
      concluida: false,
    });
    expect(res.body.criadaEm).toBeDefined();
  });

  it('usa descrição vazia quando ela não é enviada', async () => {
    const res = await criar({ titulo: 'Sem descrição' });
    expect(res.body.descricao).toBe('');
  });

  it('recusa tarefa sem título', async () => {
    const res = await criar({ descricao: 'faltou o título' });
    expect(res.status).toBe(400);
    expect(res.body.erros).toHaveLength(1);
  });

  it('recusa JSON inválido', async () => {
    const res = await request(app)
      .post('/tarefas')
      .set('Content-Type', 'application/json')
      .send('{ titulo: ');
    expect(res.status).toBe(400);
  });
});

describe('GET /tarefas', () => {
  it('lista vazia no começo', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('lista as tarefas criadas', async () => {
    await criar({ titulo: 'Primeira' });
    await criar({ titulo: 'Segunda' });
    const res = await request(app).get('/tarefas');
    expect(res.body.map((t) => t.titulo)).toEqual(['Primeira', 'Segunda']);
  });

  it('busca uma tarefa pelo id', async () => {
    await criar({ titulo: 'Achar por id' });
    const res = await request(app).get('/tarefas/1');
    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe('Achar por id');
  });

  it('responde 404 para id que não existe', async () => {
    const res = await request(app).get('/tarefas/99');
    expect(res.status).toBe(404);
  });
});

describe('PUT /tarefas/:id', () => {
  it('atualiza título e marca como concluída', async () => {
    await criar();
    const res = await request(app)
      .put('/tarefas/1')
      .send({ titulo: 'Estudar Lean', concluida: true });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, titulo: 'Estudar Lean', concluida: true });
  });

  it('responde 404 para id que não existe', async () => {
    const res = await request(app).put('/tarefas/99').send({ concluida: true });
    expect(res.status).toBe(404);
  });

  it('recusa "concluida" que não é true/false', async () => {
    await criar();
    const res = await request(app).put('/tarefas/1').send({ concluida: 'sim' });
    expect(res.status).toBe(400);
  });

  it('recusa corpo sem nenhum campo', async () => {
    await criar();
    const res = await request(app).put('/tarefas/1').send({});
    expect(res.status).toBe(400);
  });
});

describe('DELETE /tarefas/:id', () => {
  it('remove a tarefa', async () => {
    await criar();
    const res = await request(app).delete('/tarefas/1');
    expect(res.status).toBe(204);

    const busca = await request(app).get('/tarefas/1');
    expect(busca.status).toBe(404);
  });

  it('responde 404 para id que não existe', async () => {
    const res = await request(app).delete('/tarefas/99');
    expect(res.status).toBe(404);
  });
});

describe('rota desconhecida', () => {
  it('responde 404', async () => {
    const res = await request(app).get('/nao-existe');
    expect(res.status).toBe(404);
  });
});
