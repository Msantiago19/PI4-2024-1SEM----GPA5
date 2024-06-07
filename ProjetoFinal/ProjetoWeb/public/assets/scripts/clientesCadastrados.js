$(document).ready(function () {
  function carregarClientes() {
    $.ajax({
      url: '/clientesCadastrados',
      method: 'GET',
      success: function (clientes) {
        var tabela = $('#clienteTabela');
        tabela.empty();

        clientes.forEach(function (cliente) {
          var linha = '<tr>' +
            '<td>' + cliente.id_cliente + '</td>' +
            '<td>' + cliente.nome_cliente + '</td>' +
            '<td>' + cliente.telefone + '</td>' +
            '<td>' + cliente.endereco + '</td>' +
            '</tr>';
          tabela.append(linha);
        });
      },
      error: function (xhr, status, error) {
        console.error('Erro ao obter pedidos emitidos:', error);
      }
    });
  }
  carregarClientes();

});
