
const respostas = {
  success: (res, mensagem, detalhes) => {
    res.status(200).json({
      status: '200',
      mensagem: mensagem,
      detalhes: detalhes
    });
  },
  created: (res, mensagem, detalhes) => {
    res.status(201).json({
      status: '201',
      mensagem: mensagem,
      detalhes: detalhes
    });
  },
  noContent: (res) => {
    res.status(204).json({ status: '204' });
  },
  badRequest: (res, mensagem) => {
    res.status(400).json({
      status: '400',
      mensagem: mensagem
    });
  },
  unauthorized: (res, mensagem) => {
    res.status(401).json({
      status: '401',
      mensagem: mensagem,
    });
  },
  notFound: (res, mensagem) => {
    res.status(404).json({
      status: '404',
      mensagem: mensagem,
    });
  },
  InternalServerError: (res, mensagem) => {
    res.status(500).json({
      status: '500',
      mensagem: mensagem,
    });
  }
};

module.exports = respostas

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