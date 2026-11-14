const express = require('express');
const tarefasRouter = require('./routes/tarefas');

const app = express();

app.use(express.json());

// Rota simples para conferir se a API está no ar.
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/tarefas', tarefasRouter);

// Qualquer rota que não existe.
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// JSON mal formatado no corpo da requisição.
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erros: ['JSON inválido.'] });
  }
  return next(err);
});

module.exports = app;
