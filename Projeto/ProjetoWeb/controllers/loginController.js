// loginController.js
const db = require('../database/config');

module.exports = {
    fazerLogin: function (req, res) {
        // Captura os dados do formulário
        const nome = req.body.nome;
        const senha = req.body.senha;

        // Consulta no banco de dados para verificar se o nome de usuário e a senha correspondem
        // (Você precisará implementar essa lógica de acordo com a estrutura do seu banco de dados)
        // Exemplo de consulta:
        db.query('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [nome, senha], (err, result) => {
            if (err) {
                console.error('Erro ao fazer login:', err);
                res.status(500).send('Erro interno do servidor');
            } else {
                if (result.length > 0) {
                    // Se o nome de usuário e a senha estiverem corretos, retorna 'success'
                    res.status(200).send('success');
                } else {
                    // Se não houver correspondência no banco de dados, retorna 'failure'
                    res.status(200).send('failure');
                }
            }
        });
    }
};
