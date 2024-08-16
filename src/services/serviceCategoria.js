
const Categories = require('../models/tabelaCategoria');

const getCategorias = async (req, res) => {
  try {
    const { limit, page, fields, use_in_menu } = req.query;
    
    let limitValue = limit === '-1' ? null : (limit ? parseInt(limit, 10) : 12);
    const pageValue = page && limitValue ? parseInt(page, 10) : 1;
    const attributes = fields ? fields.split(',') : ['id', 'name', 'slug', 'use_in_menu'];

    const offset = limitValue && pageValue ? limitValue * (pageValue - 1) : 0;

    let filtro = {}
    if (use_in_menu === 'true') {
      filtro = {use_in_menu: 1}
    } else if (use_in_menu === 'false') {
      filtro = {use_in_menu: 0}
    }

    const total = await Categories.count();

    const categories = await Categories.findAll({
      where: filtro,
      limit: limitValue,
      offset: offset,
      attributes: attributes
    });

    res.status(200).json({
      data: categories,
      total: total,
      limit: limitValue,
      page: pageValue
    });

  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    res.status(400).json({ error: 'dados incorretos' });
  }
};

const getCategoriaId = async (req, res) =>{

  const categoryId = req.params.id
  const attributes = ['id', 'name', 'slug', 'use_in_menu']
  const categoria = await Categories.findByPk(categoryId, {attributes: attributes})

  if (categoria) {
    res.status(200).json(categoria)
  } else {
    res.status(404).json({ error: "Categoria inexistente " })
  }

}

const postCategoria = async (req, res) => {

  const { name, slug, use_in_menu } = req.body;
  
  try {
      
    const newCategory = await Categories.create({
      name: name,
      slug: slug,
      use_in_menu: use_in_menu
    });

    let createSucess = {
      statusCode: 201,
      name: newCategory.name,
      slug: newCategory.slug,
      use_in_menu: newCategory.use_in_menu
    };

    res.status(201).json(createSucess);

  } catch (erro) {
    console.log(erro);
    res.status(400).json({
      statusCode: 400,
      message: 'Dados incorretos'
    });
  }
}

const putCategoria = async (req, res) => {
  const { id } = req.params
  const { name, slug, use_in_menu } = req.body

  if (Object.keys(req.body).length === 0) {
    return res.status(204).end()
  }

  if (!req.body.hasOwnProperty('name') ||
  !req.body.hasOwnProperty('slug')||
  !req.body.hasOwnProperty('use_in_menu')) {
    return res.status(400).json({
    statusCode: 400,
    message: 'Dados incorretos',
  });
  }

  const category = await Categories.findByPk(id)
  
  if (!category) {
    return res.status(404).json({
      statusCode: 404,
      message: 'Categoria não encontrada'
    })
  }

  try {
    await category.update({ name, slug, use_in_menu })

    return res.status(200).json({
      statusCode: 200,
      message: 'Categoria atualizada com sucesso',
      data: category
    })

  } catch (erro) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Erro ao atualizar a categoria',
      detalhes: erro.message
    })
  }
}

const deleteCategoria = async (req, res) => {
  const { id } = req.params
  const categoria = await Categories.destroy({ where: { id: id } })
  
  if (categoria) {
    return res.status(200).json({
    statusCode: 200,
    message: 'Categoria deletada com sucesso'
    })
  } else {
    res.status(404).json({
    statusCode: 404,
    message: 'Categoria não encontrada'
    })
  }
}

module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria
}