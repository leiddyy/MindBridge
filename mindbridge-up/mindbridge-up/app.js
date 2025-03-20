const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

const port = 3000

const mysql = require('mysql2');
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456789',
    database:'mindbridge'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar:', erro);
    } else {
        console.log('Conectado com sucesso!');
    }
});

app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (res,req) => {
    res.sendFile(path.join(__dirname, "public", "cadastro.html"))
})

app.post('/cadastro_profissional', (req, res) => {
    const {nome, email, cpf, senha} = req.body;

    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({mensagem:"Todos os campos são obrigatorios"})
    }
    const sql = "INSERT INTO profissional (NOME, EMAIL, CPF, SENHA) VALUES (?,?,?,?)"
    conexao.query(sql, [nome, email, cpf, senha], (err, result) => {
        if (err) {
            console.error("Erro ao inserir usuario: ", err);
            return res.status(500).json({mensagem:"Erro ao registrar usuario"})
        }
        res.status(201).json({mensagem:"Usuario cadastrado com sucesso"})
    })
})

app.post('/cadastro_membro', (req, res) => {
    const {nome, email, cpf, senha} = req.body;

    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({mensagem:"Todos os campos são obrigatorios"})
    }
    const sql = "INSERT INTO MEMBRO (NOME, EMAIL, CPF, SENHA) VALUES (?,?,?,?)"
    conexao.query(sql, [nome, email, cpf, senha], (err, result) => {
        if (err) {
            console.error("Erro ao inserir usuario: ", err);
            return res.status(500).json({mensagem:"Erro ao registrar usuario"})
        }
        res.status(201).json({mensagem:"Usuario cadastrado com sucesso"})
    })
})

app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`); }); 