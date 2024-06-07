const db = require('../database/config');

module.exports = {
  buscarCliente: (clienteId, callback) => {
    db.query('SELECT * FROM cliente WHERE id_cliente = ?', [clienteId], callback);
  },

  atualizarCliente: (clienteId, nome_cliente, telefone, endereco, callback) => {
    console.log('Dados para atualizar no modelo:', { nome_cliente, telefone, endereco });
    db.query('UPDATE cliente SET nome_cliente = ?, telefone = ?, endereco = ? WHERE id_cliente = ?', [nome_cliente, telefone, endereco, clienteId], callback);
  },

  verificarPedidosPorCliente: (clienteId, callback) => {
    db.query('SELECT * FROM pedido WHERE id_cliente = ?', [clienteId], callback);
  },

  excluirCliente: (clienteId, callback) => {
    db.query('DELETE FROM cliente WHERE id_cliente = ?', [clienteId], callback);
  }
};
