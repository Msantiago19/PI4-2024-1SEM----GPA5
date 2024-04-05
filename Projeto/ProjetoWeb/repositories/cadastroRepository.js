// cadastroRepository.js
const db = require('../database/config');

module.exports = {
  inserirUsuario: function(usuario, callback) {
    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [usuario.nome, usuario.email, usuario.senha], callback);
  },
  // Adicione outras funções conforme necessário, como buscarUsuarioPorEmail, atualizarUsuario, etc.
};
