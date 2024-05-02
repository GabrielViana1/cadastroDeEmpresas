const express = require("express");
const cryptoKey = express.Router();
const CryptoJs = require('crypto-js');

async function encryptData(data, key) { //Criptografia de dados
    const encrypted = CryptoJs.AES.encrypt(data, key).toString();
    return encrypted;
}

cryptoKey.post("/encrypt/token", async function (req, res) {
    const {
        token
    } = req.body

    const key = process.env.CRYPTOKEY

    const tokenEncrypted = await encryptData(token, key)

    res.send(tokenEncrypted)
})


module.exports = cryptoKey