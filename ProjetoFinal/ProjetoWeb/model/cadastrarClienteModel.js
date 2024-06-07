const db = require('../database/config');

module.exports = {
  cadastrarCliente: function(clinte, callback) {
    const sql = 'INSERT INTO cliente (nome_cliente,telefone,senha,endereco) VALUES (?, ?, ?, ?)';
    db.query(sql, [clinte.nome, clinte.telefone, clinte.senha, clinte.endereco, clinte.medidas], callback);
  },
};








