// Criar uma funcao generica endpoint para obter informações do usuário, categoria e produto pelo ID
import resposta from "../responses"

export default function buscaId(tabela,id) {

    let obj = tabela.find((obj) => obj.id == id)
    if(obj){
        return {message: resposta.success, obj}
    }else{
        return {message: resposta.badRequest}
    }
}