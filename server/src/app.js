// colocar ROTAS no ar essas rotas.
const express = require("express")
const app = express.Router()
const cors = require('cors')

app.use(cors());

//rotas
const empresaControllers = require("./controllers/empresaController")
const usuariosController = require("./controllers/usuariosCOntroller")
const jwtVerify = require('./controllers/jwtVerify')
const cryptoKey = require('./controllers/cryptoKey')

//setando o uso das rotas
app.use(empresaControllers)
app.use(usuariosController)
app.use(jwtVerify)
app.use(cryptoKey)

module.exports = app