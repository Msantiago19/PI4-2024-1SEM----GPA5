const clienteCadastrado = require('../model/clientesCadastradosModel');

module.exports = {
  obterClienteCadastrados: function (req, res) {
    clienteCadastrado.obterClienteCadastrados((err, clientes) => {
          if (err) {
              console.error('Erro ao carregar os clientes:', err);
              res.status(500).send('Erro interno do servidor');
          } else {
              res.json(clientes);
          }
      });
  },
  
};
