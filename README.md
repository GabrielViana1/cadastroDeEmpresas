# Sistema de Cadastro de Clientes

Um aplicativo CRUD abrangente para gerenciar o cadastro de clientes, projetado para pessoas físicas (PF) e jurídicas (PJ). Este projeto demonstra práticas modernas de desenvolvimento web usando React, Node.js e PostgreSQL, proporcionando uma interface robusta e amigável para o gerenciamento de clientes.

## Índice

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Começando](#começando)
- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação](#autenticação)
- [Validação](#validação)
- [Contribuições](#contribuições)
- [Licença](#licença)

## Recursos

- **Autenticação de Usuário**: Sistema de login seguro utilizando JWT (JSON Web Tokens) para autenticação baseada em token.
- **Operações CRUD**: Criação, Leitura, Atualização e Exclusão de registros de clientes, tanto PF quanto PJ.
- **Validação em Tempo Real**: Campos de entrada validam dados em tempo real, fornecendo feedback imediato sobre erros.
- **Design Responsivo**: Interface amigável para dispositivos móveis que se ajusta perfeitamente em diferentes tamanhos de tela.
- **UI/UX Intuitiva**: Interface fácil de usar que melhora a experiência do usuário.

## Tecnologias Utilizadas

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **Estilização**: CSS, Bootstrap

## Começando

Para obter uma cópia local deste projeto e executá-lo, siga estas etapas:

### Pré-requisitos

- [Node.js](https://nodejs.org/en/download/) (v14 ou superior)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 ou superior)

### Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seuusuario/sistema-cadastro-clientes.git
   cd sistema-cadastro-clientes
## Configuração do Backend

1. Navegue até o diretório do backend:
   ```bash
   cd server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` e defina suas variáveis de ambiente:
   ```plaintext
   PORT=5000
   DB_URI=sua_uri_do_banco_de_dados
   JWT_SECRET=seu_segredo_jwt
   ```

## Configuração do Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd ../client
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Inicie os Servidores

1. Inicie o backend:
   ```bash
   cd server
   npm start
   ```

2. Em outro terminal, inicie o frontend:
   ```bash
   cd client
   npm start
   ```

## Uso

1. Abra seu navegador e navegue até `http://localhost:3000` para acessar o aplicativo.
2. Use a tela de login para autenticar com credenciais válidas.
3. Uma vez logado, navegue pelo aplicativo para gerenciar os cadastros de clientes.

## Endpoints da API
Os atuais funcionam mas não está escrito da maneira correta.
Será atualizado em breve, utilizando métodos corretos para cada ação (POST, PUT, DELETE, GET)


## Autenticação

A aplicação utiliza JWT para autenticação. Após um login bem-sucedido, o servidor gera um token que deve ser incluído no cabeçalho `Authorization` para as solicitações subsequentes.

## Validação

Todos os campos nos formulários de cadastro são validados em tempo real. Os erros são destacados imediatamente, garantindo que os usuários possam corrigir suas entradas antes da submissão.

## Contribuições

Contribuições são bem-vindas! Siga estes passos:

1. Faça um fork do repositório.
2. Crie um novo branch (`git checkout -b feature/SuaFeature`).
3. Faça commit das suas alterações (`git commit -m 'Adicionar nova feature'`).
4. Faça push para o branch (`git push origin feature/SuaFeature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para perguntas ou feedback, sinta-se à vontade para entrar em contato:

- **Seu Nome**: bielviana117@gmail.com
- **GitHub**: GabrielViana1

