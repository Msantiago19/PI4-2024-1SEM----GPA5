const clienteManuModel = require('../model/clienteManuModel');

module.exports = {
  buscarCliente: (req, res) => {
    const clienteId = req.params.id;
    clienteManuModel.buscarCliente(clienteId, (err, results) => {
      if (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).send('Cliente não encontrado');
        }
      }
    });
  },

  atualizarCliente: (req, res) => {
    const clienteId = req.params.id;
    const { nome_cliente, telefone, endereco } = req.body;

    console.log('Dados recebidos para atualização:', { nome_cliente, telefone, endereco });

    if (!nome_cliente || !telefone || !endereco) {
      return res.status(400).send('Todos os campos são obrigatórios');
    }

    clienteManuModel.atualizarCliente(clienteId, nome_cliente, telefone, endereco, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        res.send('Cliente atualizado com sucesso');
      }
    });
  },

  excluirCliente: (req, res) => {
    const clienteId = req.params.id;

    clienteManuModel.verificarPedidosPorCliente(clienteId, (err, result) => {
      if (err) {
        console.error('Erro ao verificar pedidos do cliente:', err);
        return res.status(500).send('Erro interno do servidor ao verificar pedidos');
      }

      if (result.length > 0) {
        return res.status(400).send('Cliente possui pedido, exclusão não permitida');
      }

      clienteManuModel.excluirCliente(clienteId, (err, result) => {
        if (err) {
          console.error('Erro ao excluir cliente:', err);
          res.status(500).send('Erro interno do servidor');
        } else {
          res.send('Cliente excluído com sucesso');
        }
      });
    });
  }
};
