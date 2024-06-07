$(document).ready(function() {
  $('#registroForm').on('submit', function(e) {
    e.preventDefault();
    const idPedido = $('#numPedido').val();

    if (idPedido) {
      $.ajax({
        url: `/api/pedido/${idPedido}`,
        method: 'GET',
        success: function(data) {
          console.log('Dados do pedido:', data);

          $('#manuPedidoNome').val(data.nome_produto);
          $('#manuPedidoQtd').val(data.quantidade_produto);
          $('#manuPedidoFormPagamento').val(data.forma_pagamento);
          
          // Formatar os valores para exibição no formulário
          const valorFormatado = data.valor_unidade ? data.valor_unidade.toFixed(2).replace('.', ',') : '';
          const valorTotalFormatado = data.valor_total ? data.valor_total.toFixed(2).replace('.', ',') : '';
          
          console.log('Valor formatado:', valorFormatado); // Adicionado para verificar o valor formatado
          console.log('Valor total formatado:', valorTotalFormatado); // Adicionado para verificar o valor total formatado
          
          $('#manuPedidoValor').val(valorFormatado);
          $('#manuPedidoValorTotal').val(valorTotalFormatado);
          $('#status').val(data.status_pedido);
        },
        error: function(xhr, status, error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Pedido não encontrado ou erro ao buscar os dados.',
          });
        }
      });
    }
  });

  $('#btn-atualizar').on('click', function(e) {
    e.preventDefault();
    const { idPedido, quantidade, forma_pagamento, valor, valor_total, status } = getFormData();

    if (idPedido && quantidade && forma_pagamento && valor && valor_total && status) {
      $.ajax({
        url: `/api/pedido/${idPedido}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ quantidade, forma_pagamento, valor, valor_total, status }),
        success: function() {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Pedido atualizado com sucesso.',
          });
        },
        error: function(xhr, status, error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao atualizar o pedido.',
          });
        }
      });
    }
  });

  $('#btn-excluir').on('click', function(e) {
    e.preventDefault();
    const { idPedido } = getFormData();

    if (idPedido) {
      Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!'
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: `/api/pedido/${idPedido}`,
            method: 'DELETE',
            success: function() {
              Swal.fire(
                'Excluído!',
                'Pedido foi excluído.',
                'success'
              );
              clearForm();
            },
            error: function(xhr, status, error) {
              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao excluir o pedido.',
              });
            }
          });
        }
      });
    }
  });

  function getFormData() {
    const idPedido = $('#numPedido').val();
    const quantidade = $('#manuPedidoQtd').val();
    const forma_pagamento = $('#manuPedidoFormPagamento').val();
    const valor = $('#manuPedidoValor').val().replace('.', '').replace(',', '.');
    const valor_total = $('#manuPedidoValorTotal').val().replace('.', '').replace(',', '.');
    const status = $('#status').val().trim();

    return { idPedido, quantidade, forma_pagamento, valor, valor_total, status };
  }

  function clearForm() {
    $('#manuPedidoNome').val('');
    $('#manuPedidoQtd').val('');
    $('#manuPedidoFormPagamento').val('');
    $('#manuPedidoValor').val('');
    $('#manuPedidoValorTotal').val('');
    $('#status').val('');
    $('#numPedido').val('');
  }
});
