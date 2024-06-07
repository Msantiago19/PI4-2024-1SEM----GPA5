const db = require('../database/config');

module.exports = {
  buscarPedido: (pedidoId, callback) => {
    const sql = `
      SELECT pedido.*, produto.nome_produto 
      FROM pedido 
      INNER JOIN produto ON pedido.id_produto = produto.id_produto 
      WHERE pedido.id_pedido = ?`;

    db.query(sql, [pedidoId], callback);
  },

  atualizarPedido: (pedidoId, quantidade, forma_pagamento, valor, valor_total, status, callback) => {
    db.query(
      'UPDATE pedido SET quantidade_produto = ?, forma_pagamento = ?, valor_unidade = ?, valor_total = ?, status_pedido = ? WHERE id_pedido = ?',
      [quantidade, forma_pagamento, parseFloat(valor), parseFloat(valor_total), status, pedidoId],
      callback
    );
  },

  

  excluirPedido: (pedidoId, callback) => {
    db.query('DELETE FROM pedido WHERE id_pedido = ?', [pedidoId], callback);
  }
};
