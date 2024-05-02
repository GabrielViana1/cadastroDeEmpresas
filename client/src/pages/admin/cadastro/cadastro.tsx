import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Cadastro() {

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


    async function ConsultarCNPJ() {

        try {

            const cnpj_consultado: any = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`)
            limparForm()
            set_cnpj(cnpj_consultado.data.estabelecimento.cnpj)
            set_razao(cnpj_consultado.data.razao_social)
            set_cep(cnpj_consultado.data.estabelecimento.cep)
            set_logradoruro(cnpj_consultado.data.estabelecimento.logradouro)
            set_numero(cnpj_consultado.data.estabelecimento.numero)
            set_bairro(cnpj_consultado.data.estabelecimento.bairro)
            set_cidade(cnpj_consultado.data.estabelecimento.cidade.nome)
            set_estado(cnpj_consultado.data.estabelecimento.estado.nome)
            set_complemento(cnpj_consultado.data.estabelecimento.complemento)
            set_email(cnpj_consultado.data.estabelecimento.email)
            set_telefone(cnpj_consultado.data.estabelecimento.telefone1)

        } catch (error: any) {
            if(error.response.data.status === 429) {
                setRetornoApi(true)
                setMsgPopup('Limite de tentativas por minuto excedido!')
            } else if(error.response.data.status === 400) {
                setRetornoApi(true)
                setMsgPopup('CNPJ Inválido!')
            }
        }
    }

    //Enviar dados para o banco
    const cadastrar = async (e: any) => {
        e.preventDefault()


        try {

            const dados = {
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

            const resposta: any = (await axios.post("http://localhost:8080/criar/empresas", dados, { headers: { "Content-Type": "application/json" } }))
            if (resposta.status === 200) {
                limparForm()
                setcadPopupSucesso(true)
                setMsgPopup('Cadastro realizado com sucesso!')

            } else if (resposta.status === 204) {
                setMsgPopup('Empresa já cadastrada anteriormente!')
                setRetornoApi(true)
            }

        } catch (error: any) {
            setMsgPopup('Não foi possível realizar o cadastro, atualize a página e tente novamente.')
            setRetornoApi(true)
        }
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

    const limparForm = () => {
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

    //useEffect -> vai rodar 1 unica vez quando a tela for carregada.
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
    
    

    const mudancaPopup = () => {
        // Fechar o modal de sucesso
        setcadPopupSucesso(false);
    };

    const mudancaPopupErroDb = () => {
        // Fechar o modal de erro
        setRetornoApi(false);
    };

    
    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-primary bg-primary ">
                <div className="container-fluid">

                    <Link to={'/cad/empresa'} className="navbar-brand text-white">
                        <strong>Sistema FKL</strong>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleMenu}
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
            <section className="col-md-6 offset-md-3 mt-5 card card-body shadow-lg mb-5">
                <form onSubmit={cadastrar} className="row g-3">
                    <div className="text-center mb-0">
                        <h2>Cadastrar empresas</h2>
                        <p>Insira os dados para cadastro.</p>
                    </div>
                    <div className="col-md-12 cnpj mt-0">
                        <label className="form-label mb-0">CNPJ</label><br />
                        <div className="d-flex">
                            <input type="text" value={cnpj} onChange={setarCnpj} className="form-control" id="inputCnpj" maxLength={14} />
                            <button type="button" className="btn btn-primary ms-2" onClick={ConsultarCNPJ} disabled={
                                !(cnpj.length >= 14 && cnpj !== '')
                            }>Consultar</button>
                        </div>
                        <small className="text-danger">*O CNPJ deve conter apenas números.</small>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label mb-0">Razão social</label>
                        <input type="text" value={razao || ''} onChange={setarRazao} className="form-control" id="inputRazaoSocial" />
                    </div>
                    <div className="col-md-6 cep">
                        <label className="form-label mb-0">CEP</label>
                        <div className="d-flex">
                            <input type="text" value={cep || ''} onChange={setarCep} className="form-control" id="inputCep" maxLength={8} />
                        </div>
                        <small className="text-danger">*O CEP deve conter apenas números.</small>
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-0">Logradouro</label>
                        <input type="text" value={logradouro || ''} onChange={setarLogradouro} className="form-control" id="inputLogradouro" placeholder="Rua, Avenida, etc" />
                    </div>
                    <div className="col-3">
                        <label className="form-label mb-0">Numero</label>
                        <input type="number" value={numero || ''} onChange={setarNumero} className="form-control" id="inputNumero" placeholder="ex: 212" />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label mb-0">Bairro</label>
                        <input type="text" value={bairro || ''} onChange={setarBairro} className="form-control" id="inputBairro" />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label mb-0">Cidade</label>
                        <input type="text" value={cidade || ''} onChange={setarCidade} className="form-control" id="inputCidade" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Estado</label>
                        <input type="text" value={estado || ''} onChange={setarEstado} className="form-control" id="inputEstado" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Complemento</label>
                        <input type="text" value={complemento || ''} onChange={setarComplemento} className="form-control" id="inputComplemento" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Email</label>
                        <input type="email" value={email || ''} onChange={setarEmail} className="form-control" id="inputEmail" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Telefone</label>
                        <input type="text" value={telefone || ''} onChange={setarTelefone} className="form-control" id="inputTelefone" />
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <button className="btn btn-primary me-2" disabled={!(cnpj.length >= 14 && cnpj !== '')}>Cadastrar</button>
                        <button className="btn btn-light" type="reset" onClick={limparForm}>Limpar</button>
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
            </section>
        </>
    )
}

export default Cadastro