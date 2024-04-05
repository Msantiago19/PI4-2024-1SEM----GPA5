package Conexao;

import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JOptionPane;
import java.sql.Connection;
import java.sql.PreparedStatement;
import dados.ClienteDados;

public class ClienteDAO {

    Connection conexao;
    PreparedStatement pstm = null;
    ResultSet rs;

    public void cadastrarCliente(ClienteDados objCliente) {
        String sql = "INSERT INTO cliente (nome_cliente, telefone, id_endereco, endereco, medidas) VALUES (?,?,?,?,?)";
        conexao = new conexao().getConexao();

        try {
            PreparedStatement pstm = conexao.prepareStatement(sql);
            pstm.setString(1, objCliente.getNome_cliente());
            pstm.setString(2, objCliente.getTelefone());
            pstm.setInt(3, objCliente.getId_endereco());
            pstm.setString(4, objCliente.getEndereco());
            pstm.setDouble(5, objCliente.getMedida());

            pstm.executeUpdate();
            pstm.close();
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "Erro ao cadastrar cliente. Verifique se o id_endereco é válido: " + e.getMessage());
        } finally {
            try {
                if (conexao != null) {
                    conexao.close();
                }
            } catch (SQLException e) {
                JOptionPane.showMessageDialog(null, "Erro ao fechar a conexão com o banco de dados: " + e.getMessage());
            }
        }
    }

    public ClienteDados getClienteDados(int id_cliente) {
        conexao = new conexao().getConexao();

        String sql = "SELECT * FROM cliente WHERE id_cliente = ?";
        try {
            PreparedStatement stmt = this.conexao.prepareStatement(sql);
            stmt.setInt(1, id_cliente);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                ClienteDados objCliente = new ClienteDados();
                objCliente.setNome_cliente(rs.getString("nome_cliente"));
                objCliente.setTelefone(rs.getString("telefone"));
                objCliente.setId_endereco(rs.getInt("id_endereco"));
                objCliente.setEndereco(rs.getString("endereco"));
                objCliente.setMedida(Double.parseDouble(rs.getString("medidas")));

                rs.close();
                stmt.close();
                conexao.close();

                return objCliente;
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

    public void alterarCliente(ClienteDados objCliente) {
        String sql = "update cliente set nome_cliente = ?, telefone = ?, id_endereco = ?, endereco = ?, medidas = ? where id_cliente = ?";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setString(1, objCliente.getNome_cliente());
            pstm.setString(2, objCliente.getTelefone());
            pstm.setInt(3, objCliente.getId_endereco());
            pstm.setString(4, objCliente.getEndereco());
            pstm.setDouble(5, objCliente.getMedida());
            pstm.setInt(6, objCliente.getId_Cliente());

            pstm.execute();
            pstm.close();

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "ClienteDAO AlterarCliente " + e);
        }
    }

    public void excluirCliente(ClienteDados objCliente) {
        String sql = "delete from cliente where id_cliente = ?";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setInt(1, objCliente.getId_Cliente());

            pstm.execute();
            pstm.close();
            JOptionPane.showMessageDialog(null, "Cadastro excluido!");

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "Cliente ja utilizado em pedidos!\nImpossivel excluir ");
        }
    }

}
