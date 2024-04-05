//nodemon ProjetoWeb/server.js

const express = require('express');
const app = express();
const port = 5500;
const path = require('path');
const db = require('./database/config');
const crypto = require('crypto');
const session = require('express-session');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

// Gera um novo 'secret' cada vez que o servidor é iniciado
let secret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Define o diretório para os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use('/plugins/bootstrap', express.static(path.join(__dirname, 'public', 'assets', 'plugins', 'node_modules', 'bootstrap', 'dist')));
app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Página inicial');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

