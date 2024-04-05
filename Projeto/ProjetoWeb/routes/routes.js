const express = require('express');
const path = require('path');
const router = express.Router();
const cadastroController = require('../controllers/cadastroController');
const loginController = require('../controllers/loginController');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'homepage.html'));
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'cadastro.html'));
});


// Rota para lidar com o formulário de cadastro (método POST)
router.post('/cadastro', cadastroController.cadastrarUsuario);

router.post('/login', loginController.fazerLogin);

module.exports = router;
