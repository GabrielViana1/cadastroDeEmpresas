import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Excluir() {
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
    const [cadPopupSucesso, setPopupSucesso] = useState(false);
    const [retornoApi, setRetornoApi] = useState(false)
    const [msgPopup, setMsgPopup] = useState("")
    const [showMenu, setShowMenu] = useState(false); 
    const navigate = useNavigate()


    const buscarEmpresas = async (e: any) => {
        e.preventDefault()

        const dados = {
            cnpj,
        }

        try {

            const empresa: any = (await axios.post("http://localhost:8080/consultar/empresas/excluir", dados, { headers: { "Content-Type": "application/json" } }))
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

    async function excluirEmpresas(e: any) {
        e.preventDefault()

        const dados = {
            cnpj
        }

        try {
            const empresa: any = (await axios.post("http://localhost:8080/excluir/empresas", dados, { headers: { "Content-Type": "application/json" } }))
            if(empresa.data === 'Não foi possível realizar a exclusão! Insira o CNPJ e tente novamente.') {
                setMsgPopup('Não foi possível realizar a exclusão! Insira o CNPJ e tente novamente.')
                setRetornoApi(true)
            } else if( empresa.data === 'Empresa excluída com sucesso!') {
                setMsgPopup('Empresa excluída com sucesso!')
                setPopupSucesso(true)
                limparForm()
            }
        } catch (error) {
            setMsgPopup('Não foi possível excluir empresa!' + error)
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

    const mudancaPopup = () => {
        // Fechar o modal de sucesso
        setPopupSucesso(false);
    };

    const mudancaPopupErroDb = () => {
        // Fechar o modal de erro
        setRetornoApi(false);
    };

    
    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    };

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
                        <strong>Sistema FKL</strong>
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
                    <h4 className="text-center">Localizar empresa</h4>
                    <div className="col-md-12 cnpj mt-0">
                        <label className="form-label mb-0">CNPJ</label>
                        <div className="d-flex">
                            <input type="text" className="form-control me-2" id="inputCnpj" maxLength={14} value={cnpj} onChange={setarCnpj}/>
                            <button className="btn btn-primary" onClick={buscarEmpresas}>Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-6 offset-md-3 card mt-3 card-body shadow-lg mb-5">
                <form className="row g-3">
                    <div className="col-md-12 mt-4">
                        <label className="form-label mb-0">Razão social</label>
                        <input type="text" className="form-control" id="inputRazaoSocial" disabled value={razao} onChange={setarRazao}/>
                    </div>
                    <div className="col-md-6 cep">
                        <label className="form-label mb-0">CEP</label>
                        <div className="d-flex">
                            <input type="text" className="form-control" id="inputCep" disabled value={cep} onChange={setarCep}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-0">Logradouro</label>
                        <input type="text" className="form-control" id="inputLogradouro" disabled value={logradouro} onChange={setarLogradouro}/>
                    </div>
                    <div className="col-3">
                        <label className="form-label mb-0">Numero</label>
                        <input type="number" className="form-control" id="inputNumero" disabled value={numero} onChange={setarNumero}/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label mb-0">Bairro</label>
                        <input type="text" className="form-control" id="inputBairro" disabled value={bairro} onChange={setarBairro}/>
                    </div>
                    <div className="col-md-5">
                        <label className="form-label mb-0">Cidade</label>
                        <input type="text" className="form-control" id="inputCidade" disabled value={cidade} onChange={setarCidade}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Estado</label>
                        <input type="text" className="form-control" disabled value={estado} onChange={setarEstado}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Complemento</label>
                        <input type="text" className="form-control" id="inputComplemento" disabled value={complemento} onChange={setarComplemento}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Email</label>
                        <input type="email" className="form-control" id="inputEmail" disabled value={email} onChange={setarEmail}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Telefone</label>
                        <input type="text" className="form-control" id="inputTelefone" disabled value={telefone} onChange={setarTelefone}/>
                    </div>
                    <div className="col-12 d-flex">
                        <button type="submit" className="btn btn-primary me-2" onClick={excluirEmpresas}
                        disabled={
                            !(cnpj.length >= 14 && cnpj !== '')
                        }>Excluir</button>
                    </div>
                </form>
            </div>
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
        </>
    )
}

export default Excluir