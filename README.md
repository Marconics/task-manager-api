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

## Equipe

<!-- Troquem pelos nomes completos e usuários do GitHub -->
- Integrante 1
- Integrante 2
- Integrante 3
- Integrante 4
- Integrante 5
- Integrante 6
- Integrante 7
- Integrante 8
- Integrante 9
