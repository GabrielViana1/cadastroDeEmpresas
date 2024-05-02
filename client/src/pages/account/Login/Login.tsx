import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate()

    const Logar = async (e: any) => {
        e.preventDefault()

        const dados = {
            email,
            senha,
        }

        try {

            const resposta: any = (await axios.post("http://localhost:8080/login", dados, { headers: { "Content-Type": "application/json" } }))

            const token = resposta.data.token;

            const data = {
                token,
            }

            const cryptedToken: any = (await axios.post("http://localhost:8080/encrypt/token", data, { headers: { "Content-Type": "application/json" } }))

            localStorage.setItem('token', cryptedToken.data)

            navigate('/cad/empresa')

        } catch (error) {
            setError('Credenciais inválidas. Por favor, verifique seu email e senha.');
            console.error('Erro ao fazer login:', error);
        }
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const valorEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const valorSenha = (event: any) => {
        setSenha(event.target.value);
    };

    useEffect(() => {
        localStorage.removeItem('token')
    });


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
            <div className="collapse navbar-collapse" id="navbarNav">
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

            <section className='mt-5'>
                <div className="col-md-4 offset-md-4">
                    <div className="card mt-4">
                        <div className="card-body shadow-lg">
                            <div className="text-center">
                                <h2>Acessar sistema</h2>
                                <p>Entre com suas credencias de usuário.</p>
                            </div>

                            <form onSubmit={Logar}>
                                <div className="mb-3">
                                    <label>Email de acesso:</label>
                                    <input type="email" className="form-control" placeholder="Digite seu email aqui."
                                        value={email}
                                        onChange={valorEmail} />
                                </div>

                                <div className="mb-2">
                                    <label>Senha de acesso:</label>
                                    <input type="password" className="form-control" placeholder="Digite sua senha aqui"
                                        value={senha}
                                        onChange={valorSenha} />
                                    <span className='text-danger'>{error}</span>
                                </div>

                                <div className="mb-2 d-grid">
                                    <button className="btn btn-primary" disabled={
                                        !(email !== '' && senha !== '')
                                    }>
                                        Entrar
                                    </button>
                                </div>

                                <div className="mb-2 d-grid">
                                    <Link to={'/registrar/usuario'} className="btn btn-light">
                                        Não possui conta? <strong>Registrar agora.</strong>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
