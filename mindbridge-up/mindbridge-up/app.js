const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
require('dotenv').config();

app.use(cors());

const port = 3000

const mysql = require('mysql2');
const { emitWarning } = require('process');
const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
    const sql = "INSERT INTO PROFISSIONAL (NOME, EMAIL, CPF, SENHA) VALUES (?,?,?,?)"
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

app.post('/login', (req, res) => {
    const {email, senha} = req.body;
    
    const sqlProfissional = "SELECT * FROM PROFISSIONAL WHERE EMAIL = ?"
    const sqlMenbro = "SELECT * FROM MEMBRO WHERE EMAIL = ?"

    conexao.query(sqlProfissional, [email], (err, resultadoProfissional) => {
        if (err) {
            console.error("Erro ao buscar profissional:", err);
            return res.status(500).json({ mensagem: "Erro ao buscar usuário" });
        }
        

    if(resultadoProfissional.length >0) {
        const usuario = resultadoProfissional[0]
        if(usuario.SENHA === senha) {
            return res.json({
                mensagem: "login bem-sucedido",
                usuario: {
                    id: usuario.ID,
                    nome: usuario.NOME,
                    email: usuario.EMAIL,
                    tipo: "profissional"
                }
            });
        }else {
            return res.status(401).json({ mensagem: "Senha incorreta" });
        }
    };

    conexao.query(sqlMembro, [email], (err, resultadoMembro) => {
        if (err) {
            console.error("Erro ao buscar membro:", err);
            return res.status(500).json({ mensagem: "Erro ao buscar usuário" });
        }

        if(resultadoMembro.length >0) {
            const usuario = resultadoMembro[0]
            if(usuario.SENHA === senha){
                return res.json({
                    mensagem: "login bem-sucedido",
                    usuario: {
                        id: usuario.ID,
                        nome: usuario.NOME,
                        email: usuario.EMAIL,
                        tipo: "profissional"
                    }
                });
            }else {
                return res.status(401).json({ mensagem: "Erro ao buscar usuario" })
            }
        };

        return res.status(404).json({ mensagem: "Usuário não encontrado" });
        
        });
    });
});

app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`); }); 