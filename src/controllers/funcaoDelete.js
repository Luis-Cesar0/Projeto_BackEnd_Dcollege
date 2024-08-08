const express = require('express');

function deletar(tabela, id) {
    tabela.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      console.log('Usuário deletado.');
    })
    .catch(err => {
      console.error('Erro ao deletar usuário:', err);
    });
  }
  
  module.exports = deletar