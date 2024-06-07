$(document).ready(function () {
  function carregarPedidos() {
    $.ajax({
      url: '/emitidosAdm',
      method: 'GET',
      success: function (pedidos) {
        var tabela = $('#pedidoTabela');
        tabela.empty();

        pedidos.forEach(function (pedido) {
          var linha = '<tr>' +
            '<td>' + pedido.numero_pedido + '</td>' +
            '<td>' + pedido.nome_cliente + '</td>' +
            '<td>' + pedido.status + '</td>' +
            '<td>' + new Date(pedido.data_pedido).toLocaleDateString() + '</td>' +
            '</tr>';
          tabela.append(linha);
        });
      },
      error: function (xhr, status, error) {
        console.error('Erro ao obter pedidos emitidos:', error);
      }
    });
  }
  carregarPedidos();


  function carregarPedidosCliente() {
    $.ajax({
      url: '/api/emitidosCliente',
      method: 'GET',
      success: function (pedidos) {
        var tabela = $('#pedidoTabelaCliente'); 
        tabela.empty();

        pedidos.forEach(function (pedido) {
          var linha = '<tr>' +
            '<td>' + pedido.numero_pedido + '</td>' +
            '<td>' + pedido.nome_cliente + '</td>' +
            '<td>' + pedido.status + '</td>' +
            '<td>' + new Date(pedido.data_pedido).toLocaleDateString() + '</td>' +
            '</tr>';
          tabela.append(linha);
        });
      },
      error: function (xhr, status, error) {
        console.error('Erro ao obter pedidos emitidos:', error);
      }
    });
  }

  // Carregar pedidos ao carregar a página
  carregarPedidosCliente();
});
