package Conexao;

import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JOptionPane;
import java.sql.Connection;
import java.sql.PreparedStatement;
import dados.ProdutoDados;

public class produtoDAO {

    Connection conexao;
    PreparedStatement pstm = null;
    ResultSet rs;

    public void cadastrarProduto(ProdutoDados objProdutos) {
        String sql = "insert into produto (nome_produto, valor) values (?,?) ";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setString(1, objProdutos.getNome_produto());
            pstm.setDouble(2, objProdutos.getValor());

            pstm.execute();
            pstm.close();
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "PorudotDAO CadastrarProduto " + e);
        }

    }

    public ProdutoDados getProdutoDados(int id_produto) {
        conexao = new conexao().getConexao();

        String sql = "SELECT * FROM produto WHERE id_produto = ?";
        try {
            PreparedStatement stmt = this.conexao.prepareStatement(sql);
            stmt.setInt(1, id_produto);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                ProdutoDados objProduto = new ProdutoDados();
                objProduto.setNome_produto(rs.getString("nome_produto"));
                objProduto.setValor(rs.getDouble("valor"));

                return objProduto;
            } else {
                return null;
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void alterarProduto(ProdutoDados objProduto) {
        String sql = "update produto set nome_produto = ?, valor = ? where id_produto = ?";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setString(1, objProduto.getNome_produto());
            pstm.setDouble(2, objProduto.getValor());
            pstm.setInt(3, objProduto.getId_produto());

            pstm.execute();
            pstm.close();

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "ClienteDAO AlterarProduto " + e);
        }
    }

    public void excluirProduto(ProdutoDados objProduto) {
        String sql = "delete from produto where id_produto = ?";
        conexao = new conexao().getConexao();

        try {
            pstm = conexao.prepareStatement(sql);
            pstm.setInt(1, objProduto.getId_produto());

            pstm.execute();
            pstm.close();
            JOptionPane.showMessageDialog(null, "Produto excluido!");
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "Produto ja utilizado em pedidos!\nImpossivel excluir!");
        }
    }

}
