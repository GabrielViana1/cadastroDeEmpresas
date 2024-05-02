const express = require("express");
const jwtVerify = express.Router();
const jwt = require('jsonwebtoken')
const CryptoJs = require('crypto-js');

async function decryptData(data, key) { //Descriptografia de dados
    const decrypted = CryptoJs.AES.decrypt(data, key).toString(CryptoJs.enc.Utf8);
    return decrypted;
}

async function verificarAutenticao (req, res) {
    const key = process.env.CRYPTOKEY
    const token = req.headers['authorization']
    const tokenDecrypted = await decryptData(token, key)
    if (tokenDecrypted == null) return res.sendStatus(401)

    jwt.verify(tokenDecrypted, process.env.JWTKEY, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        res.status(200).send("Usuario autenticado")
    })
}

jwtVerify.get("/consultar/jwt", async function (req, res) {
    verificarAutenticao(req, res)
})

module.exports = jwtVerify