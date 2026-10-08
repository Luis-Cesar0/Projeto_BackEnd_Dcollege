# Projeto Backend — Geração Tech / Digital College

API REST acadêmica de e-commerce desenvolvida durante a formação Full Stack do Geração Tech / Digital College. O projeto foi posteriormente revisado para aplicar melhorias de segurança, validação, organização e testes aprendidas com a experiência profissional, preservando a stack e as funcionalidades originais.

> Esta é uma revisão de um projeto acadêmico; ela não altera o contexto nem a autoria original do trabalho.

## Tecnologias e funcionalidades

- Node.js, Express e JavaScript (CommonJS).
- Sequelize 6 e MySQL.
- JWT e bcrypt para autenticação e armazenamento de senhas.
- Zod para validação de payloads, parâmetros e paginação em runtime.
- Jest e Supertest para testes automatizados.
- CRUD de usuários, categorias e produtos, com imagens/opções de produto, filtros e paginação.

## Organização

```text
src/
├── app.js                 # configuração HTTP e rotas
├── server.js              # inicialização e conexão com MySQL
├── config/conexao.js      # configuração compartilhada do Sequelize
├── controllers/           # entrada HTTP e encaminhamento aos serviços
├── middleware/            # validação Zod e autenticação Bearer
├── models/                # models Sequelize e relacionamentos
├── routes/                # endpoints
├── services/              # regras de aplicação e persistência
└── validation/schemas.js  # schemas de entrada
test/                      # testes HTTP com persistência isolada
```

O servidor valida a conexão e chama `sequelize.sync()` uma vez no início. O `sync()` padrão cria tabelas ausentes e pode criar índices declarados nos models, mas não adiciona colunas a tabelas existentes nem altera dados; não há migrations versionadas neste repositório.

## Autenticação e segurança

Faça login em `POST /v1/user/token` com e-mail e senha. A resposta mantém o formato existente e inclui o JWT em `detalhes`. Use esse valor no cabeçalho `Authorization: Bearer <token>`. O token é assinado com HS256 e expira em uma hora.

Senhas são armazenadas com bcrypt; respostas de usuário não retornam o hash. Falhas de login usam a mesma resposta para e-mail ou senha inválidos. A API valida entrada antes de chamar os serviços e limita o corpo JSON a 1 MB.

As rotas de usuário, criação/alteração/exclusão de categoria e de produto exigem token. A criação de usuário continua protegida: o projeto não implementa um fluxo de cadastro público nem papéis de usuário, então o endpoint serve como provisionamento autenticado. Atualmente, qualquer token válido pode administrar os recursos; autorização por papéis e propriedade ainda não existe.

CORS permanece aberto por padrão para manter compatibilidade com clientes web existentes. Defina `CORS_ORIGIN` como uma origem ou uma lista separada por vírgulas para restringi-lo.

## Endpoints principais

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/` | Público | Verificação simples da API |
| `POST` | `/v1/user/token` | Público | Autenticar e receber JWT |
| `GET` | `/v1/usuarios/:id` | Token | Consultar usuário sem expor senha |
| `POST` | `/v1/usuarios` | Token | Criar usuário |
| `PUT` / `DELETE` | `/v1/usuarios/:id` | Token | Alterar ou remover usuário |
| `GET` | `/v1/categorias/search` | Público | Listar categorias com filtros e paginação |
| `GET` | `/v1/categorias/:id` | Público | Consultar categoria |
| `POST`, `PUT`, `DELETE` | `/v1/categorias[/:id]` | Token | Administrar categorias |
| `GET` | `/v1/produtos/search` | Público | Listar produtos com filtros e paginação |
| `GET` | `/v1/produtos/:id` | Público | Consultar produto e relações |
| `POST`, `PUT`, `DELETE` | `/v1/produtos[/:id]` | Token | Administrar produtos |

As respostas mantêm o formato legado da API quando aplicável. A busca de categorias aceita `limit`, `page`, `fields` e `use_in_menu`. A busca de produtos aceita `limit`, `page`, `fields`, `match`, `category_ids`, `price_range` e filtros `option[Nome]=valor`. `limit=-1` lista sem limite; os demais valores de paginação são validados.

## Configuração local

Requisitos: Node.js 20.13+ e MySQL 8 (ou versão compatível com JSON e `JSON_CONTAINS`).

```sh
npm install
cp .env.example .env
npm run dev
```

No PowerShell, copie o exemplo com `Copy-Item .env.example .env`. Edite `.env` com uma base local e gere um `JWT_SECRET` aleatório com pelo menos 32 bytes. Não use os valores de exemplo em produção. O arquivo `.env` está no `.gitignore`.

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `PORT` | Não | Porta HTTP; padrão `3000` |
| `DB_NAME` | Sim | Nome da base MySQL |
| `DB_USER` | Sim | Usuário do MySQL |
| `DB_PASS` | Sim | Senha local do MySQL |
| `DB_HOST` | Sim | Host do MySQL |
| `DB_DIALECT` | Sim | Dialeto Sequelize; use `mysql` |
| `DB_PORT` | Não | Porta MySQL; padrão `3306` |
| `JWT_SECRET` | Sim | Segredo JWT com no mínimo 32 bytes |
| `CORS_ORIGIN` | Não | Origem permitida ou lista separada por vírgulas |
| `KEY_TOKEN` | Não | Nome antigo aceito temporariamente no lugar de `JWT_SECRET` |

O primeiro `npm run dev` cria tabelas ausentes sem `alter` ou `force`. Para tabelas existentes, `sync()` não adiciona colunas; o índice único declarado no model pode ser criado durante a sincronização. Antes de iniciar a revisão contra uma base antiga, confira e resolva possíveis e-mails duplicados:

```sql
SELECT email, COUNT(*) FROM usuarios GROUP BY email HAVING COUNT(*) > 1;
```

Depois de backup, adicione manualmente as colunas que ainda não existirem em bancos antigos:

```sql
ALTER TABLE produtos ADD COLUMN category_ids JSON NULL;
ALTER TABLE imagensProdutos MODIFY COLUMN path TEXT NOT NULL;
```

Confira os nomes reais das tabelas/colunas e a versão do MySQL antes de aplicar os comandos; o schema antigo do projeto não tinha um histórico de migrations para atualizar essas colunas automaticamente.

## Scripts

```sh
npm run dev    # reinicia ao alterar arquivos (node --watch)
npm start      # inicia a API
npm test       # executa Jest e Supertest
npm run lint   # verifica src/ e test/
npm run check  # lint e testes
```

Os testes HTTP usam models simulados e não precisam de um MySQL ativo. Eles cobrem login válido/inválido, JWT e Bearer, proteção de rotas, ausência do hash de senha nas respostas, validação, filtros/contagens e atualização de produto com `false`/`0`. A compatibilidade real de schema deve ser verificada também contra uma instância MySQL.

## Documentação e créditos

- [Documentação Postman](https://documenter.getpostman.com/view/25752316/2sA3s9D8on) — página existente intitulada “Projeto Backend - Dcollege”.
- [Portfólio de Luis César](https://luiscesardev.com.br)
- [LinkedIn de Luis César](https://www.linkedin.com/in/luis-cesar/)

Contribuidores originais:

- [Luis César](https://github.com/Luis-Cesar0)
- [Natanael Neves](https://github.com/NatanaelNeves)
- [Lucas Duarte](https://github.com/duartetech)
- [João Pedro](https://github.com/jp3droal)
- [Raissa Reis](https://github.com/raiswss)
- [Paulo Henrique](https://github.com/PauloHenrrq)

## Próximas melhorias

- Adicionar autorização por papéis e escopo do usuário, além de rate limiting no login.
- Substituir `sequelize.sync()` por migrations versionadas para mudanças de schema reproduzíveis.
- Adicionar testes de integração com MySQL em CI e revisar as respostas/contratos junto à coleção Postman.
- Restringir CORS por padrão quando os domínios dos clientes forem definidos.
