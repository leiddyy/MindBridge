const mysql = require('mysql2/promise');
require('dotenv').config();

async function conectarDB() {
    try {
        const conexao = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '123456789',
            database: process.env.DB_NAME || 'mindbridge',
            port: process.env.DB_PORT || 3306
        });

        console.log("🔥 Conectado ao MySQL!");
        return conexao;
    } catch (erro) {
        console.error("Erro ao conectar ao MySQL:", erro);
    }
}

module.exports = conectarDB;
