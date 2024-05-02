import { Link, useNavigate } from "react-router-dom"
import './consulta.css'
import { useState, useEffect } from "react"
import axios from "axios"

function Consultar() {

    const [empresas, set_empresas] = useState([])
    const [cnpjConsulta, set_cnpj] = useState("")
    const [empresaUnica, set_empresaUnica]: any = useState([])
    const [exibirEmpresaUnica, set_ExibirEmpresaUnica] = useState(false)
    const [cadPopupSucesso, setcadPopupSucesso] = useState(false);
    const [retornoApi, setRetornoApi] = useState(false)
    const [msgPopup, setMsgPopup] = useState("")
    const [showMenu, setShowMenu] = useState(false); 
    const navigate = useNavigate()

    async function buscarEmpresaUnica(e: any) {
        e.preventDefault()

        const dados = {
            cnpjConsulta,
        }
        try {
            if (cnpjConsulta === '') {
                set_ExibirEmpresaUnica(false)
            } else {
                const buscarEmpresaUnica: any = (await axios.post("http://localhost:8080/consultar/empresas", dados, { headers: { "Content-Type": "application/json" } }))
                if (buscarEmpresaUnica.data.rows.length > 0) {
                    set_empresaUnica(buscarEmpresaUnica)
                    set_ExibirEmpresaUnica(true)
                } else {
                    setcadPopupSucesso(true)
                    setMsgPopup("Não há empresa com esse CNPJ.")
                }
            }
        } catch (error) {
            setRetornoApi(true)
            setMsgPopup("Erro de servidor interno.")
        }
    }

    useEffect(() => {
        async function consultarEmpresas() {
            try {
                const consultarEmpresas = (await axios.get('http://localhost:8080/exibir/empresas'))
                if(consultarEmpresas.data === 'Nenhuma empresa cadastrada!') {
                   //Não realizar procedimento
                } else {
                    set_empresas(consultarEmpresas.data.rows)
                }
            } catch (error) {
                console.log('Erro interno' + error)
            }
        }
        consultarEmpresas()
    }, [])

    useEffect(() => {
        verificarJwt();
    })

    const setarValueCnpj = (e: any) => {
        set_cnpj(e.target.value)
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
            <div className="col-md-10 offset-md-1 card mt-5 card-body shadow-lg">
                <form className="row g-3">
                    <div className="text-center">
                        <h2>Localizar empresa</h2>
                        <p>Insira o CNPJ para localiza uma empresa.</p>
                    </div>
                    <div className="col-md-12 cnpj mt-0">
                        <label className="form-label mb-0">CNPJ</label>
                        <div className="d-flex">
                            <input type="text" className="form-control me-2" id="inputCnpj" value={cnpjConsulta} onChange={setarValueCnpj} maxLength={14}/>
                            <button className="btn btn-primary" onClick={buscarEmpresaUnica}>Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            {empresas.length > 0 ? (
                empresas.map((empresa: any, index: any) => (
                    <div key={index} className="col-md-10 offset-md-1 card mt-2 card-body shadow-lg" style={{ display: exibirEmpresaUnica ? "none" : "block" }}>
                        <div className="row">
                            <div className="infos d-flex">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">CNPJ</th>
                                                <th scope="col">Razão Social</th>
                                                <th scope="col">CEP</th>
                                                <th scope="col">Logradouro</th>
                                                <th scope="col">Número</th>
                                                <th scope="col">Bairro</th>
                                                <th scope="col">Cidade</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Complemento</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Telefone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{empresa.cnpj}</td>
                                                <td>{empresa.razao}</td>
                                                <td>{empresa.cep}</td>
                                                <td>{empresa.logradouro}</td>
                                                <td>{empresa.numero}</td>
                                                <td>{empresa.bairro}</td>
                                                <td>{empresa.cidade}</td>
                                                <td>{empresa.estado}</td>
                                                <td>{empresa.complemento}</td>
                                                <td>{empresa.email}</td>
                                                <td>{empresa.telefone}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-md-10 offset-md-1 card mt-2 card-body shadow-lg">
                    <div className="row">
                        <div className="infos d-flex">
                            <p>Não há empresas cadastradas.</p>
                        </div>
                    </div>
                </div>
            )}
            {exibirEmpresaUnica && empresaUnica.data && empresaUnica.data.rows && (
                <div className="col-md-10 offset-md-1 card mt-2 card-body shadow-lg" style={{ display: exibirEmpresaUnica ? "block" : "none" }}>
                    <div className="row">
                        <div className="infos d-flex">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">CNPJ</th>
                                            <th scope="col">Razão Social</th>
                                            <th scope="col">CEP</th>
                                            <th scope="col">Logradouro</th>
                                            <th scope="col">Número</th>
                                            <th scope="col">Bairro</th>
                                            <th scope="col">Cidade</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Complemento</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Telefone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empresaUnica.data && empresaUnica.data.rows && (
                                            <tr>
                                                <td>{empresaUnica.data.rows[0].cnpj}</td>
                                                <td>{empresaUnica.data.rows[0].razao}</td>
                                                <td>{empresaUnica.data.rows[0].cep}</td>
                                                <td>{empresaUnica.data.rows[0].logradouro}</td>
                                                <td>{empresaUnica.data.rows[0].numero}</td>
                                                <td>{empresaUnica.data.rows[0].bairro}</td>
                                                <td>{empresaUnica.data.rows[0].cidade}</td>
                                                <td>{empresaUnica.data.rows[0].estado}</td>
                                                <td>{empresaUnica.data.rows[0].complemento}</td>
                                                <td>{empresaUnica.data.rows[0].email}</td>
                                                <td>{empresaUnica.data.rows[0].telefone}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
            <footer className="mt-5"></footer>
        </>
    )
}

export default Consultar