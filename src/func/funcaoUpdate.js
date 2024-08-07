export default function upadate(tabela,id,dados){
    tabela.update(
		dados, 
		{ where: id }
)
  .then(
    ([contagemAfetada]) => {
    if (contagemAfetada > 0) {
      console.log(`${contagemAfetada} ${contagemAfetada = 1 ? 'Usuário' : 'Usuários'} atualizado com sucesso `);
    } else {
      console.log('Usuário não encontrado');
    }
  })
  .catch(erro => {
    console.error('Erro ao atualizar usuário:', erro);
  });

}