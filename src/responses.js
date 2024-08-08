const { Model } = require("sequelize")

const resposta= {
    success: (res)=> {
        res.status(200).json({status: '200',mensagem: 'requisição foi bem sucedida'})
    },
    created: (res,novoRecurso) => {
        res.status(201).json({status: '201',mensagem: 'novo recurso foi criado'}).json(novoRecurso)
    },
    noContent:(res)=>{
        res.status(204).json({status: '204',mensagem: 'API se recusa a retornar qualquer corpo de mensagem no response'})
    },
    badRequest: (res ,err)=>{
        res.status(400).json({status: '400',mensagem:'erro do cliente', erro: err})
    },
    unauthorized: (res, err)=>{
        res.status(401).json({status: '401',mensagem:' não possui credenciais de autenticação válidas',erro: err})
    },
    notFound: (res,err)=>{
        res.status(404).json({status: '404',mensagem:'servidor não conseguiu encontrar o recurso solicitado',erro: err})
    }

    
}
module.exports= resposta

// 200 OK
//      Indica que a API REST executou com êxito qualquer ação solicitada pelo cliente
//      Ao contrário do código de status 204, uma 200 deve incluir um corpo de resposta
// 201 CREATED
//      Indica que a requisição foi bem sucedida e que um novo recurso foi criado
// 204 No content
//      O código de status 204 geralmente é enviado em resposta a uma solicitação PUT ou DELETE quando a API se recusa a retornar qualquer corpo de mensagem no response
//      A resposta 204 NÃO DEVE incluir um corpo de mensagem
// 400 Bad Request
//      Indica que o servidor não pode ou não irá processar a requisição devido a alguma coisa que foi entendida como um erro do cliente
// 401 Unauthorized
//      Indica que a solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino
// 404 Not Found
//      Indica que o servidor não conseguiu encontrar o recurso solicitado