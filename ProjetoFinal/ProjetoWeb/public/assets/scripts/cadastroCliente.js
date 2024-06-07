$(document).ready(function () {
  $('#registroForm').submit(function (event) {
    event.preventDefault();

    var nome = $('#nomeCriarConta').val();
    var telefone = $('#telefoneCriarConta').val();
    var senha = $('#senhaCriarConta').val();
    var endereco = $('#enderecoCriarConta').val();
    // var medidas = $('#medidasCadastroCliente').val(); // Adicionado

    if (!nome || !telefone || !senha || !endereco) {
      Swal.fire('Erro', 'Por favor, preencha todos os campos', 'error');
      return;
    }
    // Validação adicional dos campos
    if (!telefone.match(/^[0-9]{10,11}$/)) {
      Swal.fire('Erro', 'Por favor, insira um número de telefone válido com o DD', 'error');
      return;
    }
    
    // if (!senha.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    //   Swal.fire('Erro', 'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos 1 letra e 1 número', 'error');
    //   return;
    // }

    // Validação para medidas
    // if (!medidas || medidas <= 0) {
    //   Swal.fire('Erro', 'Por favor, insira uma medida válida', 'error');
    //   return;
    // }

    $.ajax({
      url: '/cadastroCliente',
      method: 'POST',
      data: {
        nome: nome,
        telefone: telefone,
        senha: senha,
        endereco: endereco,
        // medidas: medidas // Adicionado
      },
      success: function (response) {
        Swal.fire('Sucesso', response, 'success')
          .then((value) => {
            window.location.href = '/login';
          });
      },
      error: function (xhr, status, error) {
        console.error('Erro ao cadastrar usuário:', error);
        Swal.fire('Erro', 'Erro interno do servidor. Por favor, tente novamente mais tarde.', 'error');
      }
    });

    // Limpa os campos do formulário
    $('#registroForm')[0].reset();
  });
});
