const emitidoPedidoModel = require('../model/emitidoPedidoModel.js');

module.exports = {
    obterPedidosEmitidos: function (req, res) {
        emitidoPedidoModel.obterPedidosEmitidos((err, pedidos) => {
            if (err) {
                console.error('Erro ao obter pedidos emitidos:', err);
                res.status(500).send('Erro interno do servidor');
            } else {
                res.json(pedidos);
            }
        });
    },

    obterPedidosEmitidosPorCliente: function(req, res) {
        const clienteId = req.session.clienteId; // Supondo que o ID do cliente esteja salvo na sessão
        if (clienteId) {
            emitidoPedidoModel.obterPedidosEmitidosPorCliente(clienteId, (err, pedidos) => {
                if (err) {
                    console.error('Erro ao obter pedidos emitidos do cliente:', err);
                    res.status(500).send('Erro interno do servidor');
                } else {
                    res.json(pedidos); // Retorna os dados dos pedidos como resposta JSON
                    console.log(pedidos);
                }
            });
        } else {
            res.status(400).send('Cliente não autenticado');
        }
    }
    
};
