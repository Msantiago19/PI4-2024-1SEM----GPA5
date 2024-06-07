const db = require('../database/config');

module.exports ={
  // obterClienteCadastrados: (clienteId, callback) => {
  //   db.query('SELECT * FROM cliente', [clienteId], callback);
  // },

  obterClienteCadastrados: function(callback) {
    const sql = `
      SELECT * FROM cliente
    `;
    db.query(sql, callback);
},
}