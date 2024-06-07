const db = require('../database/config');

module.exports = {
    obterPedidosEmitidos: function(callback) {
        const sql = `
            SELECT 
                p.id_pedido AS numero_pedido, 
                c.nome_cliente, 
                p.status_pedido AS status, 
                p.data_retirada AS data_pedido 
            FROM pedido p
            JOIN cliente c ON p.id_cliente = c.id_cliente
        `;
        db.query(sql, callback);
    },

    obterPedidosEmitidosPorCliente: (clienteId, callback) => {
        const sql = `
            SELECT 
                p.id_pedido AS numero_pedido, 
                c.nome_cliente, 
                p.status_pedido AS status, 
                p.data_retirada AS data_pedido 
            FROM pedido p
            JOIN cliente c ON p.id_cliente = c.id_cliente
            WHERE p.id_cliente = ?
        `;
        db.query(sql, [clienteId], callback);
    }
};
