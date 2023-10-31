const mysql = require('mysql2/promise');

class ModeloCliente{
    constructor(){
        this.pool = mysql.createPool({
            host:'192.168.0.176',
            user: 'root',
            password:'gabriel',
            database:'db_cliente',
        });
    }

    async criarCliente(cliente) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'insert into clientes (email, nome_cliente, endereco, telefone) values(?, ?, ?, ?)',
                [cliente.email, cliente.nome_cliente, cliente.endereco, cliente.telefone]
            );
            return resultado.insertId;
        } finally {
            connection.release();
        }
    }

    async obterTodosClientes() {
        const connection = await this.pool.getConnection();
        try{
            const [registros] = await connection.query(
                'select * from clientes'
            );
            return registros;
        } finally {
            connection.release();
        }
    }

    async obterClientePorId(id) {
        const connection = await this.pool.getConnection();
        try{
            const [registros] = await connection.query(
                'select * from clientes where id = ?',
                [id]
            );
            return registros[0];
        } finally {
            connection.release();
        }
    }

    async atualizarCliente(id, cliente) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'update clientes set email = ?,nome_cliente = ?, endereco = ?, telefone = ? where id = ?',
                [cliente.email, cliente.nome_cliente, cliente.endereco, cliente.telefone, id]
            );
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirCliente(id) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'delete from clientes where id = ?',
                [id]
            );
            return true;
        } finally {
            connection.release();
        }
    }
}

module.exports = new ModeloCliente();