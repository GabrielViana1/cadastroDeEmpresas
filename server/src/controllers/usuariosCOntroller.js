const express = require("express");
const usuariosController = express.Router();
const database = require("../database/dbConnection");
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken')


const key = process.env.CRYPTOKEY;

async function encryptData(data, key) { //Criptografia de dados
    const encrypted = CryptoJs.AES.encrypt(data, key).toString();
    return encrypted;
}

async function decryptData(data, key) { //Descriptografia de dados
    const decrypted = CryptoJs.AES.decrypt(data, key).toString(CryptoJs.enc.Utf8);
    return decrypted;
}


//Cadastrar usuario
usuariosController.post("/inserir/usuario", async function (req, res) {
    // Dados da requisição
    const {
        nome,
        email,
        senha
    } = req.body;

    try {
        const senhaEncrypted = await encryptData(senha, key);//Criptogrando senha

        const verificarEmailExiste = await database.query(//Verificando se email ja existe
            'SELECT * FROM usuarios WHERE email = $1', [email]
        );

        if (verificarEmailExiste.rows.length > 0) {//Verificando se email ja existe
            res.send("Email já cadastrado.");
        } else {
            // Inserindo dados no db
            await database.query(
                `INSERT INTO USUARIOS (nome, email, senha) values('${nome}', '${email}', '${senhaEncrypted}')`
            );

            res.send("Cliente cadastrado com sucesso");
        }
    } catch (error) {
        res.send(error);//Enviando msg de erro
    }
});

// Login de usuário
usuariosController.post("/login", async function (req, res) {
    // Dados da requisição
    const { email, senha } = req.body;

    try {
        let descrypt = ''
        // Verifica se o email existe no banco de dados
        const usuario = await database.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (usuario.rows.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // Descriptografa a senha do usuário
        await chamarDecrypt(email)
            .then(senhaDescriptografada => {
                descrypt = senhaDescriptografada
            })
            .catch(error => {
                console.error("Erro ao descriptografar a senha:", error);
            });

        // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
        if (senha !== descrypt) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const payload = {
            userId: usuario.rows[0].id, 
        }

        // Gera um token JWT com o ID do usuário como payload
        const token = jwt.sign(payload, process.env.JWTKEY);

        // Retorna o token JWT como resposta
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});

async function chamarDecrypt(email) {


    try {
        const data = await database.query(
            'SELECT senha FROM usuarios WHERE email = $1', [email]
        );

        if (data.rows.length > 0) {
            return decryptData(data.rows[0].senha, key); // Retorna o resultado da descriptografia
        } else {
            console.log("Usuário não encontrado.");
            return null; // Retorna nulo caso o usuário não seja encontrado
        }
    } catch (error) {
        console.error("Erro ao recuperar senha criptografada do banco de dados:", error);
        throw error; // Lança o erro para ser tratado posteriormente
    }
}

module.exports = usuariosController;
