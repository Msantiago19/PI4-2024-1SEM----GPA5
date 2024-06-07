$(document).ready(function () {
  var idCliente;
  var pedido;
  var medidas;
  var valor;
  var quantidade;
  var formaPagamento;
  var dataRetirada;

  // Função para carregar os produtos no select
  function carregarProdutos() {
    $.ajax({
      url: '/produtos',
      method: 'GET',
      success: function(response) {
        $('#selectProduto').empty();
        $('#selectProduto').append($('<option>', {
          value: '',
          text: 'Selecione um produto'
        }));
        response.forEach(function(produto) {
          var option = $('<option>', {
            value: produto.id_produto,
            text: produto.nome_produto + ' - R$ ' + produto.valor.toFixed(2)
          });
          option.data('price', produto.valor);
          $('#selectProduto').append(option);
        });
      },
      error: function(xhr, status, error) {
        console.error('Erro ao carregar os produtos:', error);
      }
    });
  }

  // Função para calcular e exibir o valor total com base nos produtos selecionados
  function calcularValorTotal() {
    var selectedOption = $('#selectProduto option:selected');
    var price = parseFloat(selectedOption.data('price'));

    if (!selectedOption.val() || isNaN(price)) {
      $('#CadPedValor').val('Produto Inválido');
      $('#QtdCadPedido').val('');
    } else {
      var total = price;
      var totalQuantity = 1;

      $('#QtdCadPedido').val(totalQuantity);
      $('#CadPedValor').val(total.toFixed(2));
    }
  }

  // Adicionar evento de mudança no select para calcular o valor total
  $('#selectProduto').change(function () {
    calcularValorTotal();
  });

  // Chamar a função para carregar os produtos 
  carregarProdutos();


  $('#salvarBtn').click(function(event) {
    event.preventDefault();
    idCliente = $('#CadPedIdCliente').val();
    pedido = $('#selectProduto').val();
    medidas = $('#CadPedMedida').val();
    valor = $('#CadPedValor').val();
    quantidade = $('#QtdCadPedido').val();
    formaPagamento = $("input[name='RadioPagamento']:checked").val();
    dataRetirada = $('#CadPedDataRetirada').val();

    if (!idCliente || !pedido || !medidas || !valor || !quantidade || !formaPagamento || !dataRetirada || valor === 'Produto Inválido') {
      Swal.fire('Erro', 'Por favor, preencha todos os campos corretamente', 'error');
      return;
    }

    $.ajax({
      url: '/cadastroPedido',
      method: 'POST',
      data: {
        id_cliente: idCliente,
        id_produto: pedido,
        medidas: medidas,
        valor: valor,
        quantidade: quantidade,
        forma_pagamento: formaPagamento,
        data_retirada: dataRetirada
      },
      success: function(response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pedido salvo com sucesso!",
          showConfirmButton: false,
          timer: 4500
        });
      },
      error: function(xhr, status, error) {
        console.error('Erro ao salvar o pedido:', error);
        Swal.fire('Erro', 'Erro interno do servidor. Por favor, tente novamente mais tarde.', 'error');
      }
    });

    $('#registroForm')[0].reset();
  });
  $('#excluirBtn').click(function (event) {
    event.preventDefault();

    // Limpar o formulário
    $('#registroForm')[0].reset();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Formulário limpo com sucesso",
      showConfirmButton: false,
      timer: 1500
    });

    console.log('Botão Excluir clicado');
  });
});
