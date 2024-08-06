const resposta= {
    success: (res ,data)=> {
        res.status(200).json({status: 'sucess',data})
    },
    created: (res, data) => {
        res.status(201).json({status: 'created',data})
    },
    noContent:(res,data)=>{
        res.status(204).json({status: 'no content',data})
    },
    badRequest: (res,data)=>{
        res.status(400).json({status: 'bad request',data})
    },
    unauthorized: (res,data)=>{
        res.status(401).json({status: 'unauthorized',data})
    },
    notFound: (res,data)=>{
        res.status(404).json({status: 'not found',data})
    }

    
}
export default resposta

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