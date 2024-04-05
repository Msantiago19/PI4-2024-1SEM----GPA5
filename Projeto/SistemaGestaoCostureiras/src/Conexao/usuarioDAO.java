
package Conexao;
import dados.UsuarioDados;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Connection;
import javax.swing.JOptionPane;
import java.sql.PreparedStatement;


public class usuarioDAO {
    
    Connection conexao = null;
    PreparedStatement pstm = null;
    
    public ResultSet autenticacaoUsuario(UsuarioDados dados){
        conexao = new conexao().getConexao();

        try {
            String sql = "select * from usuario where nome = ? and senha = ? ";
            PreparedStatement pstm = conexao.prepareStatement(sql);
            pstm.setString(1, dados.getNome_usuario());
            pstm.setString(2, dados.getSenha_usuario());

            ResultSet rs = pstm.executeQuery();
            return rs;

        } catch (SQLException erro) {
            JOptionPane.showMessageDialog(null, "UsuarioDados: " + erro);
            return null;
        }
    }
    
        public void cadastrarUsuario(UsuarioDados dados){
        String sql = "insert into usuario (nome, senha) values (?,?)";
        conexao = new conexao().getConexao();
                try {
            pstm = conexao.prepareStatement(sql);
            pstm.setString(1, dados.getNome_usuario());
            pstm.setString(2, dados.getSenha_usuario());

            pstm.execute();
            pstm.close();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "UsuarioDAO" + e);
        }
        
    }
    }

