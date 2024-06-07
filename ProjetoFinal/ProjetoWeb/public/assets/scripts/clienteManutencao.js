$(document).ready(function() {
  // Função para buscar os dados do cliente
  $('#registroForm').on('submit', function(e) {
    e.preventDefault();
    const idCliente = $('#idClienteManun').val();
    
    if (idCliente) {
      $.ajax({
        url: `/cliente/${idCliente}`,
        method: 'GET',
        success: function(data) {
          $('#manuPedidoNome').val(data.nome_cliente); 
          $('#manuPedidoTelefone').val(data.telefone);
          $('#manuPedidoEndereco').val(data.endereco);
        },
        error: function(xhr, status, error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Cliente não encontrado ou erro ao buscar os dados.',
          });
        }
      });
    }
  });

  // Função para atualizar os dados do cliente
  $('#btn-alterar').on('click', function(e) {
    e.preventDefault();
    const idCliente = $('#idClienteManun').val();
    const nome_cliente = $('#manuPedidoNome').val();
    const telefone = $('#manuPedidoTelefone').val();
    const endereco = $('#manuPedidoEndereco').val();

    console.log('Dados enviados para atualização:', { nome_cliente, telefone, endereco });

    if (idCliente && nome_cliente && telefone && endereco) {
      $.ajax({
        url: `/cliente/${idCliente}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ nome_cliente, telefone, endereco }),
        success: function() {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente atualizado com sucesso.',
          });
        },
        error: function(xhr, status, error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao atualizar o cliente.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Todos os campos são obrigatórios',
      });
    }
  });

  // Função para excluir o cliente
  $('#btn-excluir').on('click', function(e) {
    e.preventDefault();
    const idCliente = $('#idClienteManun').val();

    if (idCliente) {
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
            url: `/cliente/${idCliente}`,
            method: 'DELETE',
            success: function() {
              Swal.fire(
                'Excluído!',
                'Cliente foi excluído.',
                'success'
              );
              // Limpar campos após exclusão
              $('#manuPedidoNome').val('');
              $('#manuPedidoTelefone').val('');
              $('#manuPedidoEndereco').val('');
              $('#idClienteManun').val('');
            },
            error: function(xhr, status, error) {
              let errorMessage = 'Erro ao excluir o cliente.';
              if (xhr.status === 400) {
                errorMessage = 'Cliente possui pedido, exclusão não permitida';
              }
              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: errorMessage,
              });
            }
          });
        }
      });
    }
  });
});
