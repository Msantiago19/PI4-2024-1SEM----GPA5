const cadastroPedidoModel = require('../model/cadastroPedidoModel');

exports.obterProdutos = function (req, res) {
  // Chame o método do modelo para obter os produtos do banco de dados
  cadastroPedidoModel.obterProdutos(function (err, produtos) {
    if (err) {
      console.error('Erro ao obter os produtos:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.json(produtos); // Envie os produtos como uma resposta JSON
    }
  });
};

exports.salvarPedido = function (req, res) {
  const { id_cliente, id_produto, medidas, valor, quantidade, forma_pagamento, data_retirada } = req.body;

  const novoPedido = {
    id_cliente,
    id_produto,
    medidas,
    valor,
    quantidade,
    forma_pagamento,
    data_retirada
  };

  cadastroPedidoModel.salvarPedido(novoPedido, function (err, result) {
    if (err) {
      console.error('Erro ao salvar o pedido:', err);
      res.status(500).send('Erro ao salvar o pedido. Por favor, tente novamente mais tarde.');
    } else {
      res.status(200).send('Pedido salvo com sucesso!');
    }
  });
};