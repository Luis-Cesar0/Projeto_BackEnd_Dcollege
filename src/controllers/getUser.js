const express=require('express');


const tabelaUsuarios= require("../models/tabelaUsuarios")


const getUser = (req, res) => {
    tabelaUsuarios.findAll()
      .then(usuarios => res.json(usuarios))
      .catch(err => res.status(500).json({ error: err.message }));
  };

module.exports= getUser