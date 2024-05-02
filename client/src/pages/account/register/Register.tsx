import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Register() {
    // eslint-disable-next-line
    const { handleSubmit, formState: { errors }, } = useForm(); //Validações de formulario
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [errorNome, setErrorNome] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorSenha, setErrorSenha] = useState("");
    const [errorSenhaConfirmacao, setErrorSenhaConfirmacao] = useState("");
    const [cadPopupSucesso, setcadPopupSucesso] = useState(false);
    const [retornoErroDb, setRetornoErroDb] = useState(false)
    const [msgErroDb, setMsgErroDb] = useState("")
    const [showMenu, setShowMenu] = useState(false); 

    const registraUsuario = async () => {

        try {

            const dados = {
                nome,
                email,
                senha
            }

            //Enviando dados para cadastro
            const resposta: any = (await axios.post("http://localhost:8080/inserir/usuario", dados, {
                headers: {
                    "Content-Type": "application/json"
                }
            }))

            if (resposta.data === 'Cliente cadastrado com sucesso') {
                setcadPopupSucesso(true)

                //Limpar form
                setNome('')
                setEmail('')
                setSenha('')
                setConfirmacaoSenha('')
            } else {
                setRetornoErroDb(true)
                setMsgErroDb('Email já cadastrado!')
            }

        } catch (error: any) {

            setRetornoErroDb(true)
            setMsgErroDb(error)
        }

    };

    //Buscar valor a cada alteração em seu [parametro]
    // eslint-disable-next-line
    useEffect(() => { validarNome(); }, [nome]);

    // eslint-disable-next-line
    useEffect(() => { validarEmail(); }, [email]);

    // eslint-disable-next-line
    useEffect(() => { validarSenha(); }, [senha]);

    // eslint-disable-next-line
    useEffect(() => { validarConfirmacaoSenha() }, [confirmacaoSenha]);


    const mudancaPopup = () => {
        // Fechar o modal de sucesso
        setcadPopupSucesso(false);
    };

    const mudancaPopupErroDb = () => {
        // Fechar o modal de erro
        setRetornoErroDb(false);
    };

    const mudancaNome = (event: any) => {
        setNome(event.target.value);
    };

    const mudancaEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const mudancaSenha = (event: any) => {
        setSenha(event.target.value);
    };

    const mudancaConfirmacaoSenha = (event: any) => {
        setConfirmacaoSenha(event.target.value);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    };

    //Validações de caracteres
    const validarNome = () => {
        if (nome.length < 3 && nome !== '') {
            setErrorNome("O nome deve ter no mínimo 3 caracteres.");
        } else {
            setErrorNome("");
        }
    };

    const validarEmail = () => {
        if (!/^\S+@\S+$/i.test(email) && email !== '') {
            setErrorEmail("Por favor, insira um email válido.");
        } else {
            setErrorEmail("");
        }
    };

    const validarSenha = () => {
        // eslint-disable-next-line
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!@#$%¨&*()_+=\[\]{}^~\\|;:'",.<>?])[A-Za-z\d@$!%*?&!@#$%¨&*()_+=\[\]{}^~\\|;:'",.<>?]{8,}$/;
        if (!regex.test(senha) && senha !== '') {
            setErrorSenha("Por favor, insira uma senha com no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um símbolo (por exemplo, @, #, $, %, etc.)");
        } else {
            setErrorSenha(""); 
        }
    };
    
    const validarConfirmacaoSenha = () => {
        if (senha !== confirmacaoSenha && confirmacaoSenha !== '') {
            setErrorSenhaConfirmacao("Senhas não conferem, por favor verifique.");
        } else {
            setErrorSenhaConfirmacao("");
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand text-white">
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
                                <Link to={'/'} className="nav-link text-white">
                                    Acessar sistema
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/registrar/usuario'} className="nav-link text-white">
                                    Criar conta de usuário
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="mt-5">
                <div className="col-md-4 offset-md-4">
                    <div className="card mt-4 mb-4">
                        <div className="card-body shadow-lg">
                            <div className="text-center">
                                <h2>Criar conta de usuário</h2>
                                <p>Preencha o campo para criar sua conta.</p>
                            </div>

                            <form onSubmit={handleSubmit(registraUsuario)} noValidate>
                                <div className="mb-2">
                                    <label>Nome do usuário</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite seu nome aqui."
                                        value={nome}
                                        onChange={mudancaNome}
                                    />
                                    <span className="text-danger">{errorNome}</span>
                                </div>

                                <div className="mb-2">
                                    <label>Email de acesso:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Digite seu email aqui."
                                        value={email}
                                        onChange={mudancaEmail}
                                    />
                                    <span className="text-danger">{errorEmail}</span>
                                </div>

                                <div className="mb-2">
                                    <label>Senha de acesso:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Digite sua senha aqui."
                                        value={senha}
                                        onChange={mudancaSenha}
                                    />
                                    <span className="text-danger">{errorSenha}</span>
                                </div>

                                <div className="mb-5">
                                    <label>Confirme sua senha:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirme sua senha aqui."
                                        value={confirmacaoSenha}
                                        onChange={mudancaConfirmacaoSenha}
                                    />
                                    <span className="text-danger">{errorSenhaConfirmacao}</span>
                                </div>

                                <div className="mb-2 d-grid">
                                    <button className="btn btn-primary" type="submit"
                                        disabled={
                                            !(nome !== '' && email !== '' && senha !== '' && confirmacaoSenha !== '' &&
                                                senha === confirmacaoSenha && errorNome === '' && errorEmail === '' &&
                                                errorSenha === '' && errorSenhaConfirmacao === '')
                                        }>
                                        Realizar cadastro
                                    </button>
                                </div>
                                <div className="mb-2 d-grid">
                                    <Link to={"/"} className="btn btn-light">
                                        Já possui conta? <strong>Acesse aqui.</strong>
                                    </Link>
                                </div>
                            </form>
                            <div className={`modal ${cadPopupSucesso ? "show" : ""}`} role="dialog" style={{ display: cadPopupSucesso ? "block" : "none" }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header d-flex justify-content-between align-items-center">
                                            <h5 className="modal-title">Cadastro realizado com sucesso!</h5>
                                            <button type="button" className="btn btn-primary" arial-label="close" onClick={mudancaPopup}>Ok</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`modal ${retornoErroDb ? "show" : ""}`} role="dialog" style={{ display: retornoErroDb ? "block" : "none" }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header d-flex justify-content-between align-items-center ">
                                            <h5 className="modal-title">{msgErroDb}</h5>
                                            <button type="button" className="btn btn-primary" aria-label="Close" onClick={mudancaPopupErroDb}>Ok</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
