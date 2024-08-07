export default function create(tabela, dados){
    tabela.create(
        dados
    )
    .then(tabela => {
        console.log('Usuário criado:', tabela.toJSON());
    })
    .catch(err => {
        console.error('Erro ao criar usuário:', err);
    });
}