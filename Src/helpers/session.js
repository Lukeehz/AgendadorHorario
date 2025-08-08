const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionMiddleware = session({
  store: new FileStore({
    path: './sessions', // pasta criada na raiz do projeto
  }),
  secret: 'sua-chave-secreta-aqui',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 dia, por exemplo
  },
});

module.exports = sessionMiddleware;
