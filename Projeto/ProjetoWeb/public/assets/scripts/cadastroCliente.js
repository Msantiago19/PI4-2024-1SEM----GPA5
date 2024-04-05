$(document).ready(function () {
  $('#registroForm').submit(function (event) {
    // Evita o envio do formulário
    event.preventDefault();

    var nome = $('input[name="nomeCadastro"]').val();
    var email = $('input[name="emailCadastro"]').val();
    var senha = $('input[name="senhaCadastro"]').val();
    var confirmSenha = $('input[name="confirmSenhaCadastro"]').val();

    // Validação das senhas
    if (senha !== confirmSenha) {
      alert('As senhas não coincidem!');
      return false;
    }

    // Envia os dados do formulário via AJAX
    $.ajax({
      url: '/cadastro',
      method: 'POST',
      data: {
        nome: nome,
        email: email,
        senha: senha
      },
      success: function (response) {
        alert(response);
        // Redireciona para a tela de login após o cadastro bem-sucedido
        window.location.href = '/login';
      },
      error: function (xhr, status, error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
      }
    });
  });
});
