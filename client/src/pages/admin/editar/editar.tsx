import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

function EditarCad() {

    const [id, set_id] = useState("")
    const [cnpjConsulta, set_cnpjConsulta] = useState("")
    const [cnpj, set_cnpj] = useState("")
    const [razao, set_razao] = useState("")
    const [cep, set_cep] = useState("")
    const [logradouro, set_logradoruro] = useState("")
    const [numero, set_numero] = useState("")
    const [bairro, set_bairro] = useState("")
    const [cidade, set_cidade] = useState("")
    const [estado, set_estado] = useState("")
    const [complemento, set_complemento] = useState("")
    const [email, set_email] = useState("")
    const [telefone, set_telefone] = useState("")
    const [cadPopupSucesso, setcadPopupSucesso] = useState(false);
    const [retornoApi, setRetornoApi] = useState(false)
    const [msgPopup, setMsgPopup] = useState("")
    const [showMenu, setShowMenu] = useState(false); 
    const navigate = useNavigate()


    const buscarEmpresas = async (e: any) => {
        e.preventDefault()

        const dados = {
            cnpjConsulta,
        }

        try {

            const empresa: any = (await axios.post("http://localhost:8080/consultar/empresas", dados, { headers: { "Content-Type": "application/json" } }))
            set_id(empresa.data.rows[0].id)
            set_cnpj(empresa.data.rows[0].cnpj)
            set_razao(empresa.data.rows[0].razao)
            set_cep(empresa.data.rows[0].cep)
            set_logradoruro(empresa.data.rows[0].logradouro)
            set_numero(empresa.data.rows[0].numero)
            set_bairro(empresa.data.rows[0].bairro)
            set_cidade(empresa.data.rows[0].cidade)
            set_estado(empresa.data.rows[0].estado)
            set_complemento(empresa.data.rows[0].complemento)
            set_email(empresa.data.rows[0].email)
            set_telefone(empresa.data.rows[0].telefone)

        } catch (error) {
            setMsgPopup('Empresa não encontrada!')
            setRetornoApi(true)
        }

    }

    const salvarEdicao = async (e: any) => {
        e.preventDefault()

        const dados = {
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
        }

        try {
            const salvarEdicao: any = (await axios.post("http://localhost:8080/editar/empresas", dados, { headers: { "Content-Type": "application/json" } }))
            if(salvarEdicao.data === 'Esse CNPJ já está cadastrado para outra empresa!') {
                setMsgPopup('Esse CNPJ já está cadastrado para outra empresa!')
                setRetornoApi(true)
            } else if(salvarEdicao.data === 'Alteração realizada com sucesso!'){
                setMsgPopup('Alteração realizada com sucesso!')
                setcadPopupSucesso(true)
            } else if(salvarEdicao.data === 'Erro ao editar a empresa.') {
                setMsgPopup('Erro ao editar a empresa. Limpe o formulário e tente novamente.')
                setRetornoApi(true)
            }
        } catch (error:any) {
            console.log(error)
            setMsgPopup(`Empresa não encontrada! Limpe o formulário e tente novamente.`)
            setRetornoApi(true)
        }
    }


    const setarCnpjConsulta = (e: any) => {
        set_cnpjConsulta(e.target.value)
    }

    const setarCnpj = (e: any) => {
        set_cnpj(e.target.value)
    }

    const setarRazao = (e: any) => {
        set_razao(e.target.value)
    }

    const setarCep = (e: any) => {
        set_cep(e.target.value)
    }

    const setarLogradouro = (e: any) => {
        set_logradoruro(e.target.value)
    }

    const setarNumero = (e: any) => {
        set_numero(e.target.value)
    }

    const setarBairro = (e: any) => {
        set_bairro(e.target.value)
    }

    const setarCidade = (e: any) => {
        set_cidade(e.target.value)
    }

    const setarEstado = (e: any) => {
        set_estado(e.target.value)
    }

    const setarComplemento = (e: any) => {
        set_complemento(e.target.value)
    }

    const setarEmail = (e: any) => {
        set_email(e.target.value)
    }

    const setarTelefone = (e: any) => {
        set_telefone(e.target.value)
    }

    const mudancaPopup = () => {
        // Fechar o modal de sucesso
        setcadPopupSucesso(false);
        limparForm()
    };

    const mudancaPopupErroDb = () => {
        // Fechar o modal de erro
        setRetornoApi(false);
    };

    
    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    };

    const limparForm = () => {
        set_cnpjConsulta('')
        set_cnpj('')
        set_razao('')
        set_cep('')
        set_logradoruro('')
        set_numero('')
        set_bairro('')
        set_cidade('')
        set_estado('')
        set_complemento('')
        set_email('')
        set_telefone('')
    }

    useEffect(() => {})

    useEffect(() => {
        verificarJwt();
    })

    async function verificarJwt() {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const resposta = await axios.get('http://localhost:8080/consultar/jwt', {
                    headers: {
                        'Authorization': token
                    }
                })
                if (resposta.status !== 200) {
                    navigate('/')
                    alert('Token inválido! Realize o login novamente.')
                }
            } catch (error) {
                navigate('/')
                alert('Token inválido! Realize o login novamente.')
            }
        } else {
            navigate('/')
            alert('Token inválido! Realize o login novamente.')
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-primary bg-primary ">
                <div className="container-fluid">

                    <Link to={'/cad/empresa'} className="navbar-brand text-white">
                        <strong>Sistema EMP</strong>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleMenu} // Chame a função toggleMenu quando o botão for clicado
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={'/cad/empresa'} className="nav-link text-white">
                                    Cadastrar empresas
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/editarCad/empresa'} className="nav-link text-white">
                                    Editar cadastro de empresas
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/consulta/empresa'} className="nav-link text-white">
                                    Consultar empresas
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/inativar/empresa'} className="nav-link text-white">
                                    Excluir empresas
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link btn btn text-white">
                                    Sair do sistema
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="col-md-6 offset-md-3 card mt-5 card-body shadow-lg">
                <form className="row g-3">
                    <div className="text-center">
                        <h2>Editar empresas</h2>
                        <p>Insira um CNPJ para buscar uma empresa.</p>
                    </div>
                    <div className="col-md-12 cnpj mt-0">
                        <label className="form-label mb-0">CNPJ</label>
                        <div className="d-flex">
                            <input type="text" className="form-control me-2" value={cnpjConsulta} onChange={setarCnpjConsulta} required maxLength={14} />
                            <button className="btn btn-primary" onClick={buscarEmpresas}
                                disabled={
                                    !(cnpjConsulta.length >= 14 && cnpjConsulta !== '')
                                }>Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-6 offset-md-3 card mt-3 card-body shadow-lg mb-5">
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label mb-0">CNPJ</label>
                        <input type="text" className="form-control" value={cnpj} onChange={setarCnpj} required maxLength={14} />
                        <small className="text-danger">*O CNPJ deve conter apenas números.</small>
                    </div>
                    
                    <div className="col-md-12">
                        <label className="form-label mb-0">Razão social</label>
                        <input type="text" className="form-control" value={razao} onChange={setarRazao} />
                    </div>
                    <div className="col-md-6 cep">
                        <label className="form-label mb-0">CEP</label>
                        <div className="d-flex">
                            <input type="text" className="form-control" value={cep} onChange={setarCep} maxLength={8}/>
                        </div>
                        <small className="text-danger">*O CEP deve conter apenas números.</small>
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-0">Logradouro</label>
                        <input type="text" className="form-control" placeholder="Rua, Avenida, etc" value={logradouro} onChange={setarLogradouro} />
                    </div>
                    <div className="col-3">
                        <label className="form-label mb-0">Numero</label>
                        <input type="number" className="form-control" placeholder="ex: 212" value={numero} onChange={setarNumero} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label mb-0">Bairro</label>
                        <input type="text" className="form-control" value={bairro} onChange={setarBairro} />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label mb-0">Cidade</label>
                        <input type="text" className="form-control" value={cidade} onChange={setarCidade} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Estado</label>
                        <input type="text" className="form-control" value={estado} onChange={setarEstado} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Complemento</label>
                        <input type="text" className="form-control" value={complemento} onChange={setarComplemento} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Email</label>
                        <input type="email" className="form-control" value={email} onChange={setarEmail} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Telefone</label>
                        <input type="text" className="form-control" value={telefone} onChange={setarTelefone} />
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary me-2" onClick={salvarEdicao}
                            disabled={
                                !(cnpj.length >= 14 && cnpj !== '')
                            }
                        >Salvar</button>
                        <button type="reset" className="btn btn-light" onClick={limparForm}>Limpar</button>
                    </div>
                </form>
                <div className={`modal ${cadPopupSucesso ? "show" : ""}`} role="dialog" style={{ display: cadPopupSucesso ? "block" : "none" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between align-items-center">
                                <h5 className="modal-title">{msgPopup}</h5>
                                <button type="button" className="btn btn-primary" arial-label="close" onClick={mudancaPopup}>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal ${retornoApi ? "show" : ""}`} role="dialog" style={{ display: retornoApi ? "block" : "none" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between align-items-center ">
                                <h5 className="modal-title">{msgPopup}</h5>
                                <button type="button" className="btn btn-primary" aria-label="Close" onClick={mudancaPopupErroDb}>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditarCad