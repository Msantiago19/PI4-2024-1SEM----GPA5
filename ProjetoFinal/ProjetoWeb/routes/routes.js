const express = require('express');
const path = require('path');
const router = express.Router();

const cadastroClienteController = require('../controllers/cadastroClienteController.js');
const cadastroUsuarioAdmController = require('../controllers/cadastrarUsuarioAdmController.js');
const loginController = require('../controllers/loginController');
const pedidoController = require('../controllers/cadastroPedidoController.js');
const emitidoPedido = require('../controllers/emitidoPedidoController.js');
const clienteManuController = require('../controllers/clienteManuController.js'); 
const pedidoManuController = require('../controllers/pedidoManuController.js');
const clienteCadastrado = require('../controllers/clientesCadastradosController.js')
// Rotas de páginas
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'homepage.html'));
});

router.get('/cadastroCliente', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'cadastroCliente.html'));
});

router.get('/cadastroUsuario', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'cadastroUsuarioAdm.html'));
});

router.get('/cadastroPedido', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'cadastroDePedidos.html'));
});

router.get('/manutencaoPedido', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'manutencaoPedidos.html'));
});

router.get('/manutencaoCliente', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'manutencaoCliente.html'));
});

router.get('/emitidos', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'pedidosEmitidos.html'));
});

router.get('/emitidosCliente', (req, res) => {
    console.log('ID do cliente na sessão:', req.session.clienteId);
    if (!req.session.clienteId) {
        return res.status(403).send('Cliente não autenticado');
    }
    res.sendFile(path.join(__dirname,'..', 'view', 'pedidosEmitidosCliente.html'));
});

router.get('/Clientes', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'view', 'clienteCadastrados.html'));
});

router.get('/bemvindo', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'bemvindo.html'));
});

router.get('/sobrenos', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'sobre.html'));
});

router.get('/meusDados', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'sobre.html'));
});
// Rota para lidar com o formulário de cadastro (método POST)
router.post('/cadastroCliente', cadastroClienteController.cadastrarCliente);
router.post('/cadastroUsuario', cadastroUsuarioAdmController.cadastrarUsuario);
router.post('/cadastroClienteAdm', cadastroUsuarioAdmController.cadastrarClienteAdm);

router.post('/login', loginController.fazerLogin);
router.post('/loginCostureira', loginController.fazerLoginCostureira);
router.post('/redefinirSenha', loginController.redefinirSenha);
router.get('/dadosCliente', loginController.obterDadosCliente);


// Rota para obter a lista de produtos
router.get('/produtos', pedidoController.obterProdutos);
router.post('/cadastroPedido', pedidoController.salvarPedido);

router.get('/emitidosAdm', emitidoPedido.obterPedidosEmitidos);
router.get('/api/emitidosCliente', emitidoPedido.obterPedidosEmitidosPorCliente);
router.get('/clientesCadastrados', clienteCadastrado.obterClienteCadastrados);

// Rotas para manutenção de clientes
router.get('/cliente/:id', clienteManuController.buscarCliente);
router.put('/cliente/:id', clienteManuController.atualizarCliente);
router.delete('/cliente/:id', clienteManuController.excluirCliente);

router.get('/api/pedido/:id', pedidoManuController.buscarPedido);
router.put('/api/pedido/:id', pedidoManuController.atualizarPedido);
router.delete('/api/pedido/:id', pedidoManuController.excluirPedido);

module.exports = router;
