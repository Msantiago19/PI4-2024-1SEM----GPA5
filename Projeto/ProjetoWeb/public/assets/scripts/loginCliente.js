$(document).ready(function () {
  $('#loginForm').submit(function (event) {
      // Evita o envio do formulário
      event.preventDefault();

      // Captura os valores dos campos
      var nome = $('#NomeLogin').val();
      var senha = $('#SenhaLogin').val();

      // Validação dos campos
      if (nome.trim() === '' || senha.trim() === '') {
          alert('Por favor, preencha todos os campos');
          return;
      }

      // Envio dos dados do formulário via AJAX
      $.ajax({
          url: '/login',
          method: 'POST',
          data: {
              nome: nome,
              senha: senha
          },
          success: function (response) {
              // Verifica a resposta do servidor e redireciona para a página inicial se o login for bem-sucedido
              if (response === 'success') {
                  window.location.href = '/homepage';
              } else {
                  alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
              }
          },
          error: function (xhr, status, error) {
              console.error('Erro ao fazer login:', error);
              alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
          }
      });
  });
});
