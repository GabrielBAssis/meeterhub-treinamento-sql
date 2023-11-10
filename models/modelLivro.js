const mysql = require('mysql2/promise');
const pool = require('../pool')

class ModeloLivro{
   
    async criarLivro(livro) {
        const connection = await pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'insert into tb_editora (id_livro, ISBN, titulo, ano, preço, id_autor, id_editora) values(?, ?, ?, ?)',
                [livro.id_livro, livro.ISBN, livro.titulo, livro.ano, livro.preço, livro.id_autor, livro.id_editora]
            );
            return resultado.insertId;
        } finally {
            connection.release();
        }
    }

    async obterTodosLivros() {
        const connection = await pool.getConnection();
        try{
            const [registros] = await connection.query(
                'select * from tb_livro'
            );
            return registros;
        } finally {
            connection.release();
        }
    }

    async obterLivroPorId(id) {
        const connection = await pool.getConnection();
        try{
            const [registros] = await connection.query(
                'select * from tb_livro where id_livro = ?',
                [id]
            );
            return registros[0];
        } finally {
            connection.release();
        }
    }

    async atualizarLivro(id, livro) {
        const connection = await pool.getConnection();
        try{
            await connection.query(
                'update tb_livro set livro_id = ?, ISBN = ?, titulo = ?, ano = ?, preço = ?, id_autor = ?, id_editora = ? where id = ?',
                [livro.id_livro, livro.ISBN, livro.titulo, livro.ano, livro.preço, livro.id_autor, livro.id_editora, id]
            );
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirLivro(id) {
        const connection = await pool.getConnection();
        try{
            await connection.query(
                'delete from tb_livro where id_livro = ?',
                [id]
            );
            return true;
        } finally {
            connection.release();
        }
    }
}

module.exports = new ModeloLivro();