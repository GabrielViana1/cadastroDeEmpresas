const express = require("express")
const api = express()
const app = require("./src/app")
const bodyParser = require('body-parser')

api.use(bodyParser.json())
api.use(express.json())


const porta = 8080
api.listen(porta, function(){

    console.log(`http://localhost:${porta}/`)
})

//api use essas rotas

api.use(app)