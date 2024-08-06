// Criar endpoint para obter informações do usuário pelo ID


// Criar endpoint para obter informações do usuário pelo ID
Usuario.findByPk(1)
  .then(usuario => {
    if (usuario) {
      console.log('Usuário encontrado:', usuario);
    } else {
      console.log('Usuário não encontrado');
    }
  })
  .catch(err => {
    console.error('Erro ao buscar usuário:', err);
  });


 // Criar endpoint para obter informações da categoria pelo ID
Categoria.findByPk(1)
  .then(categoria => {
    if (categoria) {
      console.log('Categoria encontrada:', categoria);
    } else {
      console.log('Categoria não encontrada');
    }
  })
  .catch(err => {
    console.error('Erro ao buscar categoria:', err);
  });

 //Criar endpoint para obter informações do produto pelo ID
Produto.findByPk(1)
  .then(produto => {
    if (produto) {
      console.log('Produto encontrado:', produto);
    } else {
      console.log('Produto não encontrado');
    }
  })
  .catch(err => {
    console.error('Erro ao buscar produto:', err);
  });