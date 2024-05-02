//o que sao controllers
//tudo que vai manipular dados no banco de dados
//rotas post, get, delete, put
const express = require("express")
const empresaController = express.Router()
const database = require('/CadastroEmpresa/server/src/database/dbConnection')

empresaController.post("/consultar/empresas", async function (req, res) {

    const {
        cnpjConsulta
    } = req.body

    try {
        const buscarEmpresa = await database.query(//Verificando se empresa existe
            'SELECT * FROM empresas WHERE cnpj = $1', [cnpjConsulta]
        );

        res.status(200).send(buscarEmpresa)

    } catch (error) {
        res.status(203).send('Empresa não encontrada!')
    }
})

empresaController.post("/consultar/empresas/excluir", async function (req, res) {

    const {
        cnpj,
    } = req.body

    try {
        const buscarEmpresa = await database.query(//Verificando se empresa existe
            'SELECT * FROM empresas WHERE cnpj = $1', [cnpj]
        );

        res.status(200).send(buscarEmpresa)

    } catch (error) {
        res.status(203).send('Empresa não encontrada!')
    }
})

empresaController.get("/exibir/empresas", async function (req, res) {
    try {
        const empresas = await database.query(`SELECT * FROM EMPRESAS`)
        if(empresas.rows.length > 0 ) {
            res.send(empresas)
        } else {
            res.send('Nenhuma empresa cadastrada!')
        }
    } catch (error) {
        res.send('Erro interno no servidor')
    }
})

empresaController.post("/editar/empresas", async function (req, res) {

    const {
        id,
        cnpjConsulta,
        cnpj,
        razao,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
        email,
        telefone
    } = req.body;

    try {
        const verificarCNPJExistente = await database.query(
            `SELECT COUNT(*) AS count FROM empresas WHERE cnpj = '${cnpj}' AND id != '${id}'
            `);

            console.log(verificarCNPJExistente)
        const buscarEmpresas = await database.query(
            'SELECT * FROM empresas WHERE cnpj = $1', [cnpjConsulta]
        );

        if (verificarCNPJExistente.rows[0].count > 0) {
            res.send('Esse CNPJ já está cadastrado para outra empresa!');
        } else if (buscarEmpresas.rows.length <= 0) {
            res.send('Empresa não encontrada! Limpe o formulário e tente novamente.');
        } else {
            const editarEmpresas = await database.query(`
                    UPDATE empresas SET
                    cnpj = $1,
                    razao = $2,
                    cep = $3,
                    logradouro = $4,
                    numero = $5,
                    bairro = $6,
                    cidade = $7,
                    estado = $8,
                    complemento = $9,
                    email = $10,
                    telefone = $11
                    WHERE id = $12`,
                [cnpj, razao, cep, logradouro, numero, bairro, cidade, estado, complemento, email, telefone, id]
            );

            // Verifica se algum registro foi atualizado
            if (editarEmpresas.rowCount > 0) {
                res.send('Alteração realizada com sucesso!');
            } else {
                res.send('Erro ao editar a empresa.');
            }
        }
    } catch (error) {
        res.send('Erro interno do servidor.');
    }
});



empresaController.post("/criar/empresas", async function (req, res) {


    const {
        cnpj,
        razao,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
        email,
        telefone

    } = req.body

    //script sql fazendo insert
    try {
        const verificarEmpresaExiste = await database.query(//Verificando se email ja existe
            'SELECT * FROM empresas WHERE cnpj = $1', [cnpj]
        );

        if (verificarEmpresaExiste.rows.length > 0) {//Verificando se email ja existe
            res.status(204).send("Empresa já cadastrada anteriormente.");
        } else {
            //Verificação de campo vazio
            const razaoValue = razao || '';
            const cepValue = cep || '';
            const logradouroValue = logradouro || '';
            const numeroValue = numero || '';
            const bairroValue = bairro || '';
            const cidadeValue = cidade || '';
            const estadoValue = estado || '';
            const complementoValue = complemento || '';
            const emailValue = email || '';
            const telefoneValue = telefone || '';

            // Inserindo dados no db
            database.query(
                `INSERT INTO EMPRESAS (cnpj, razao, cep, logradouro, numero, bairro, cidade, estado, complemento, email, telefone)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [cnpj, razaoValue, cepValue, logradouroValue, numeroValue, bairroValue, cidadeValue, estadoValue, complementoValue, emailValue, telefoneValue]
            );

            res.status(200).send('Cadastro realizado com sucesso!')
        }
    } catch (error) {
        res.status(500).send(error + 'Falha ao cadastrar');//Enviando msg de erro
    }
})


empresaController.post("/excluir/empresas", async function (req, res) {
    const { 
        cnpj,
    } = req.body

    try {
       const deletarEmpresa =  await database.query( 
            `DELETE FROM empresas
            WHERE cnpj = '${cnpj}';
            `
        )

        if(deletarEmpresa.rowCount > 0) {
            res.send('Empresa excluída com sucesso!')
        } else {
            res.send('Não foi possível realizar a exclusão! Insira o CNPJ e tente novamente.')
        }
    } catch (error) {
        res.send('Não foi possível realizar a exclusão! Insira o CNPJ e tente novamente.')
    }
})

module.exports = empresaController