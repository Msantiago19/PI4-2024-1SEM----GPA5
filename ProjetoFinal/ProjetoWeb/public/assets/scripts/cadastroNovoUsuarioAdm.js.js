$(document).ready(function () {
  $('#flexSwitchCheckChecked').change(function () {
    if ($(this).is(':checked')) {
      $('#campoTelefone').hide();
      $('#campoEndereco').hide();
      $('#campoSenha').show();
    } else {
      $('#campoTelefone').show();
      $('#campoEndereco').show();
      $('#campoSenha').hide();
    }
  });

  $('#flexSwitchCheckChecked').trigger('change');

  // Função para validar e restringir a entrada no campo de telefone
  $('#telefoneCadastroCliente').on('input', function () {
    var telefone = $(this).val().replace(/\D/g, '');
    var formattedTelefone = '';

    if (telefone.length > 2) {
      formattedTelefone = telefone.substring(0, 2) + '-';
      if (telefone.length > 10) {
        telefone = telefone.substring(0, 11);
      }
      formattedTelefone += telefone.substring(2);
    } else {
      formattedTelefone = telefone;
    }

    $(this).val(formattedTelefone);
  });

  $('#registroForm').off('submit').submit(function (event) {
    event.preventDefault();

    var nome = $('#nomeCadastroCliente').val();
    var senha = $('#senhaCadastroCliente').val();
    var telefone = $('#telefoneCadastroCliente').val();
    var endereco = $('#enderecoCadastroCliente').val();

    var isUsuario = $('#flexSwitchCheckChecked').is(':checked');
    var url = isUsuario ? '/cadastroUsuario' : '/cadastroClienteAdm';
    var data = { nome: nome };

    var missingFields = [];

    if (!nome) {
      missingFields.push('Nome');
    }

    if (isUsuario) {
      if (!senha) {
        missingFields.push('Senha');
      }
    } else {
      if (!telefone) {
        missingFields.push('Telefone');
      } else {
        // Validação do formato do telefone
        var telefoneRegex = /^\d{2}-\d{8,9}$/;
        if (!telefoneRegex.test(telefone)) {
          missingFields.push('Telefone (formato inválido, use 11-99999999 ou 11-999999999)');
        }
      }
      if (!endereco) {
        missingFields.push('Endereço');
      }
    }

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campos obrigatórios faltando',
        text: 'Por favor, preencha os seguintes campos: ' + missingFields.join(', ')
      });
      return false;
    }

    if (isUsuario) {
      data.senha = senha;
    } else {
      data.telefone = telefone;
      data.endereco = endereco;
    }

    $.ajax({
      url: url,
      method: 'POST',
      data: data,
      success: function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cadastro realizado com sucesso",
          showConfirmButton: false,
          timer: 1500
        });
        $('#registroForm')[0].reset();
        $('#flexSwitchCheckChecked').trigger('change');
      },
      error: function (xhr, status, error) {
        console.error('Erro ao cadastrar:', error);
        Swal.fire('Erro', 'Erro interno do servidor. Por favor, tente novamente mais tarde.', 'error');
      }
    });

    return false;
  });
});
