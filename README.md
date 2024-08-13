____
**COMANDOS GIT**  
*atualizando uma branch diferente da main*  

atualiza seu repositório local com a mais nova versão da master - ```git pull origin main```  
acessa sua branch local que receberá as atualizações da master -``` git checkout <nome-do-seu-branch-local>```  
realiza o merge da master com sua branch - ```git merge main```  

*clonar uma branch*

```git checkout -b <nome-do-seu-branch-local> origin/<nome-do-branch-remoto>```

*cria uma branch nova*

```git checkout -b <nome-do-seu-branch-local>```

*trocar de branch*

```git checkout <nome-do-seu-branch-local>```

*Faz um push e cria uma nova branch no github*  

```git push --set-upstream origin funcao_update```

*remove um arquivo vercionado*  
```git rm --cached  <nome-do-seu-arquivo>```


____

**SEQUENCIA PARA CRIA O PROJETO**   

```npm init -y```  


Gerencia as requisições,rotas e URLs,entre outra funcionalidades  

```npm install express```  


Instalar a dependência de forma global "-g" significa globlmente. 
Executar o comando através do prompt(modo administrador) de comando, executar somente se nunca
instalado a dependência na maquina,após instalar, reniciar o PC.  

```npm install -g nodmon```  


Instalar as dependência como desenvolvedor para reniciar o servidor sempre
que houver alterações no código fonte.  

``` npm install --save-dev nodemon```  

___
**COMO RODAR O POJETO DEPOIS DE CLONAR O REPOSITORIO**  
Instalar todas as dependencias indicada pelo package.json

```npm install```  

Rodar o projeto  

``` npm run dev```  

___
**IMPORTAÇÕES E EXPORTAÇÕES DO PROJETO**  
importação  

```const express = require('express')```


exportação  

```module.exports = express;```

Here's a README draft inspired by the structure of the project you mentioned:

---

# Projeto Backend - Geracão Tech

Este repositório contém o backend do projeto Geração Tech, desenvolvido como parte de um trabalho acadêmico para o curso de Desenvolvimento Full Stack.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Express.js**: Framework para criação de APIs.
- **Sequelize**: ORM para interação com bancos de dados.
- **MySQL**: Banco de dados relacional.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Luis-Cesar0/Projeto_BackEnd_Dcollege.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

1. Crie o arquivo `.env` e configure com as seguintes informações: 
 ```bash
    DB_HOST=monorail.proxy.rlwy.net
    DB_USER=root
    DB_PASS=CIREobKtrYwudjCLeADoBehkUikHExdx
    DB_NAME=railway
    DB_PORT=11097
    DB_DIALECT=mysql
   ```

2. Execute as migrações do banco de dados:
   ```bash
   npx sequelize db:migrate
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

## Funcionalidades

- **Autenticação**: Implementação de JWT para autenticação de usuários.
- **CRUD**: Operações de Create, Read, Update e Delete para as entidades principais.
- **Validação**: Validação de dados de entrada usando middleware.

## Contribuidores

- [Natanael Neves](https://github.com/natanaelneves)
- [Luis Cesar](https://github.com/Luis-Cesar0)

---
