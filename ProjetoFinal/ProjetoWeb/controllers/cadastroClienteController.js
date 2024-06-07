
const cadastroClienteModel = require('../model/cadastrarClienteModel');

module.exports = {
  cadastrarCliente: function(req, res) {
    // Verifica se a solicitação é do tipo POST
    if (req.method !== 'POST') {
      res.status(405).send('Método não permitido');
      return;
    }

    const novoCliente = {
      nome: req.body.nome,
      telefone: req.body.telefone,
      senha: req.body.senha,
      endereco: req.body.endereco,
    };

    cadastroClienteModel.cadastrarCliente(novoCliente, (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        res.status(200).send('Usuário cadastrado com sucesso');
      }
    });
  },
  // Adicione outras funções do controlador conforme necessário
};
