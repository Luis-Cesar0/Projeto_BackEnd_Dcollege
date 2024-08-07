____
**COMANDOS GIT**  
*atualizadno uma branch diferente da main*  

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

```import express from 'express'```


exportação  

```export default app```
