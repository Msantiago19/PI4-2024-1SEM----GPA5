const db = require('../database/config');

module.exports = {
  cadastrarUsuario: function(usuario, callback) {
      const sql = 'INSERT INTO usuario (nome, senha) VALUES (?, ?)';
      db.query(sql, [usuario.nome, usuario.senha], callback);
  },

  cadastrarClienteAdm: function(cliente, callback) {
      const sql = 'INSERT INTO cliente (nome_cliente, telefone, senha, endereco) VALUES (?, ?, ?, ?)';
      db.query(sql, [cliente.nome, cliente.telefone, cliente.senha, cliente.endereco], callback);
  },


};