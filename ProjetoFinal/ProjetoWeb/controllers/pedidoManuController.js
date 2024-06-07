const pedidoManuModel = require('../model/pedidoManuModel');

module.exports = {
  buscarPedido: (req, res) => {
    const pedidoId = req.params.id;
    pedidoManuModel.buscarPedido(pedidoId, (err, results) => {
      if (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).send('Pedido não encontrado');
        }
      }
    });
  },

  atualizarPedido: (req, res) => {
    const pedidoId = req.params.id;
    const { quantidade, forma_pagamento, valor, valor_total, status } = req.body;

    pedidoManuModel.atualizarPedido(pedidoId, quantidade, forma_pagamento, valor, valor_total, status, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar pedido:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        res.send('Pedido atualizado com sucesso');
      }
    });
  },

  excluirPedido: (req, res) => {
    const pedidoId = req.params.id;
    pedidoManuModel.excluirPedido(pedidoId, (err, result) => {
      if (err) {
        console.error('Erro ao excluir pedido:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        res.send('Pedido excluído com sucesso');
      }
    });
  }
};
