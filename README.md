
# Projeto Backend - Dcollege

Este repositório contém o backend do projeto Geração Tech, desenvolvido como parte de um trabalho acadêmico para o curso de Desenvolvimento Full Stack.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Express.js**: Framework para criação de APIs.
- **Sequelize**: ORM para interação com bancos de dados.
- **MySQL**: Banco de dados relacional.
- **Bcrypt**: Biblioteca para hashing de senhas.
- **Cors**: Middleware para habilitar CORS.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **JWT (jsonwebtoken)**: Autenticação baseada em tokens JWT.
- **Jest**: Framework de testes em JavaScript.
- **Supertest**: Testes de integração para APIs.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Luis-Cesar0/Projeto_BackEnd_Dcollege.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Uso

Para iniciar o servidor em modo de desenvolvimento, execute:
```bash
npm run dev
```

## Estrutura do Projeto

- `src/`
  - `controllers/`: Controladores das rotas.
  - `models/`: Definição dos modelos Sequelize.
  - `routes/`: Definição das rotas da API.
  - `config/`: Configurações do banco de dados e outras.  
- `tests/`: Testes unitários e de integração com Jest e Supertest.

### Rotas da API - 

#### Usuários

- **GET /v1/usuarios/:id**: Retorna os detalhes de um usuário específico pelo ID.
- **POST /v1/usuarios**: Cria um novo usuário.
- **PUT /v1/usuarios/:id**: Atualiza um usuário existente.
- **DELETE /v1/usuarios/:id**: Remove um usuário.

#### Autenticação

- **POST /v1/user/token**: Autentica um usuário e retorna um token JWT.

#### Categorias

- **GET /v1/categorias/search**: Lista todas as categorias de produtos.
- **GET /v1/categorias/:id**: Retorna detalhes de uma categoria específica.
- **POST /v1/categorias**: Cria uma nova categoria.
- **PUT /v1/categorias/:id**: Atualiza uma categoria existente.
- **DELETE /v1/categorias/:id**: Remove uma categoria.

#### Produtos

- **GET /v1/produto/search**: Lista todos os produtos disponíveis.
- **GET /v1/produto/:id**: Retorna detalhes de um produto específico.
- **POST /v1/produto**: Cria um novo produto.
- **PUT /v1/produto/:id**: Atualiza um produto existente.
- **DELETE /v1/produto/:id**: Remove um produto.

## Funcionalidades

- **Autenticação**: Implementação de JWT para autenticação de usuários.
- **Criptografia**: Utilização do Bcrypt para hashing seguro de senhas.
- **CRUD**: Operações de Create, Read, Update e Delete para as entidades principais.
- **Validação**: Validação de dados de entrada usando middleware.
- **Testes**: Testes automatizados com Jest e Supertest.

## Contribuidores

- [Luis César](https://github.com/Luis-Cesar0)
- [Natanael Neves](https://github.com/NatanaelNeves)
- [Lucas Duarte](https://github.com/duartetech)
- [João Pedro](https://github.com/jp3droal)
- [Raissa Reis](https://github.com/raiswss)
- [Paulo Henrique](https://github.com/PauloHenrrq)






