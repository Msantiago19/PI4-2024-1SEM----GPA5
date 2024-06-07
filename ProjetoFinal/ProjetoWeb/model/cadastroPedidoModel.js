const db = require('../database/config');

// Método para obter os produtos do banco de dados
exports.obterProdutos = function(callback) {
  const query = 'SELECT * FROM produto'; // Query para selecionar todos os produtos

  // Execute a consulta no banco de dados
  db.query(query, function(err, results) { // Alteração aqui para usar db.query
    if (err) {
      callback(err, null); // Se houver um erro, retorne-o para o controlador
    } else {
      callback(null, results); // Se não houver erro, retorne os resultados para o controlador
    }
  });

};

exports.salvarPedido = function(dadosPedido, callback) {
  const { id_cliente, id_produto, medidas, valor, quantidade, forma_pagamento, data_retirada } = dadosPedido;
  const valorTotal = parseFloat(valor) * parseInt(quantidade);
  
  const query = 'INSERT INTO pedido (id_cliente, id_produto, quantidade_produto, valor_unidade, valor_total, forma_pagamento, medidas, data_retirada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [id_cliente, id_produto, quantidade, parseFloat(valor), valorTotal, forma_pagamento, medidas, data_retirada];

  db.query(query, values, function(err, result) {
    if (err) {
      console.error('Erro ao salvar o pedido:', err);
      callback(err, null);
    } else {
      atualizarMedidasCliente(id_cliente, medidas, function(err, result) {
        if (err) {
          console.error('Erro ao atualizar as medidas do cliente:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  });
};
// Função para atualizar as medidas do cliente após a inserção de um novo pedido
function atualizarMedidasCliente(idCliente, novasMedidas, callback) {
  // Query para atualizar as medidas do cliente na tabela de clientes
  const query = 'UPDATE cliente SET medidas = ? WHERE id_cliente = ?';
  const values = [novasMedidas, idCliente];

  // Executa a consulta no banco de dados
  db.query(query, values, function(err, result) {
    if (err) {
      console.error('Erro ao atualizar as medidas do cliente:', err);
      callback(err, null); // Se houver um erro, retorne-o para a função de callback
    } else {
      callback(null, result); // Se não houver erro, retorne os resultados para a função de callback
    }
  });
}
