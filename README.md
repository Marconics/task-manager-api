# task-manager-api

API REST para organizar tarefas: criar, listar, atualizar e excluir (CRUD).

Projeto acadêmico de **Gestão Ágil** do curso de Análise e Desenvolvimento de Sistemas da **Fatec Taubaté**. O objetivo é aplicar práticas do **Lean** e do **Kanban** no desenvolvimento de software, usando **GitHub Issues** para o backlog e **GitHub Projects** para o quadro Kanban.

## MVP (Produto Mínimo Viável)

O MVP entrega só o que gera valor imediato para quem precisa organizar tarefas:

- Criar uma tarefa
- Listar tarefas e ver uma tarefa pelo id
- Atualizar uma tarefa (título, descrição, marcar como concluída)
- Excluir uma tarefa

Ficaram **fora do MVP** (estão no backlog do GitHub, sem prioridade agora): banco de dados, login de usuários, categorias, prazos/notificações e interface web. No Lean isso evita desperdício: não construímos o que ainda não foi validado.

## Tecnologias

| Tecnologia | Para quê |
|---|---|
| Node.js | Ambiente para rodar JavaScript no servidor |
| Express | Framework para criar as rotas da API |
| Jest | Testes automatizados |
| Supertest | Simula requisições HTTP nos testes |
| GitHub Actions | Integração contínua: roda os testes a cada push |
| GitHub Issues + Projects | Backlog e quadro Kanban |

## Estrutura

```
task-manager-api/
├── src/
│   ├── app.js                  # configura o Express e as rotas
│   ├── server.js               # sobe o servidor
│   ├── routes/tarefas.js       # rotas /tarefas
│   ├── controllers/            # uma operação do CRUD por arquivo
│   ├── repositories/           # armazenamento em memória
│   └── validators/             # validação dos dados
├── test/                       # testes automatizados
└── .github/workflows/ci.yml    # integração contínua
```

## Como rodar

Pré-requisito: Node.js 18 ou mais novo.

```bash
npm install
npm start        # API em http://localhost:3000
npm test         # roda os testes
```

## Endpoints

| Método | Rota | O que faz | Resposta |
|---|---|---|---|
| GET | `/health` | Confere se a API está no ar | 200 |
| POST | `/tarefas` | Cria uma tarefa | 201, ou 400 se faltar título |
| GET | `/tarefas` | Lista todas as tarefas | 200 |
| GET | `/tarefas/:id` | Mostra uma tarefa | 200, ou 404 |
| PUT | `/tarefas/:id` | Atualiza título, descrição e/ou concluída | 200, 400 ou 404 |
| DELETE | `/tarefas/:id` | Exclui uma tarefa | 204, ou 404 |

Formato de uma tarefa:

```json
{
  "id": 1,
  "titulo": "Preparar o seminário",
  "descricao": "Slides e demonstração do GitHub",
  "concluida": false,
  "criadaEm": "2026-10-16T20:00:00.000Z",
  "atualizadaEm": "2026-10-16T20:00:00.000Z"
}
```

Exemplos com `curl`:

```bash
# criar
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Preparar o seminário", "descricao": "Slides e GitHub"}'

# listar
curl http://localhost:3000/tarefas

# marcar como concluída
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"concluida": true}'

# excluir
curl -X DELETE http://localhost:3000/tarefas/1
```

## Integração contínua

A cada push na `main` e em todo pull request, o GitHub Actions instala as dependências e roda `npm test`. O resultado aparece na aba **Actions** e como ✔️ ou ❌ ao lado de cada commit.

## Equipe

- Marcos
- Vitória
- Camilly
- Lara
- Melina
- Lucas
- Miguel
- Laís
- Maria
