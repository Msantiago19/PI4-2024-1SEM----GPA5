package Conexao;

import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JOptionPane;
import java.sql.Connection;
import java.sql.PreparedStatement;
import dados.EnderecosDados;

public class EnderecosDAO {

    Connection conexao;
    PreparedStatement pstm = null;
    ResultSet rs;

    public void cadastrarEndereco(EnderecosDados objEndereco) {

        String sql = "insert into endereco (endereco, cep) values (?,?)";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setString(1, objEndereco.getNome_endereco());
            pstm.setString(2, objEndereco.getCep());

            pstm.execute();
            pstm.close();
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "EnderecoDAO CadastrarEndereco " + e);
        }
    }

    public EnderecosDados getEnderecoDados(int id_endereco) {
        conexao = new conexao().getConexao();

        String sql = "SELECT * FROM endereco WHERE id_endereco = ?";
        try {
            PreparedStatement stmt = this.conexao.prepareStatement(sql);
            stmt.setInt(1, id_endereco);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                EnderecosDados objEndereco = new EnderecosDados();
                objEndereco.setNome_endereco(rs.getString("endereco"));
                objEndereco.setCep(rs.getString("cep"));

                rs.close();
                stmt.close();
                conexao.close();

                return objEndereco;
            } else {

                rs.close();
                stmt.close();
                conexao.close();

                return null;
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void alterarEndereco(EnderecosDados objEndereco) {
        String sql = "update endereco set endereco = ?, cep = ? where id_endereco = ?";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setString(1, objEndereco.getNome_endereco());
            pstm.setString(2, objEndereco.getCep());
            pstm.setInt(3, objEndereco.getId_endereco());

            pstm.execute();
            pstm.close();

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "EnderecoDAO AlterarEndereco " + e);
        }
    }

    public void excluirEndereco(EnderecosDados objEndereco) {
        String sql = "delete from endereco where id_endereco = ?";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setInt(1, objEndereco.getId_endereco());

            pstm.execute();
            pstm.close();
            JOptionPane.showMessageDialog(null, "Endereço excluido!");

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "Endereço ja vinculado a um usuario!\nImpossivel excluir ");
        }
    }

}
