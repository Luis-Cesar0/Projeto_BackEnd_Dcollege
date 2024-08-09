const tabelaCategoria = require('../models/tabelaCategoria');
const resposta = require('../responses');


const getCategorias = async (req, res) => {
    try {
        const categorias = await tabelaCategoria.findAll();
        if(categorias){
            resposta.success(res,categorias)
        }else{
            resposta.badRequest(res,'Erro ao buscar categorias')
        }
    } catch (error) {
        res.json(error);
    }
}

const getCategoriaId = async (req, res) => {
    const id = req.params.id;
    try {
        const categoria = await tabelaCategoria.findByPk(id);
        if(categoria){
            resposta.success(res,categoria)
        }else{
            resposta.notFound(res,`Categoria com id=${id} não foi encontrada`)
        }
    } catch (error) {
        res.json(error);
    }
}

//post

const postCategoria = async (req, res) => {
    const { name,slug,use_in_menu } = req.body;
        //FALTA O TOKEN PARA O 401
    if (!name || !slug || !use_in_menu) {
        resposta.badRequest(res, 'Todos os campos são obrigatórios');
    }
    try {
        const novaCategoria = await tabelaCategoria.create({
            name: name,
            slug: slug,
            use_in_menu: use_in_menu,
        });
        if(novaCategoria){
            resposta.created(res,novaCategoria)
        }else{
            resposta.badRequest(res,'Erro ao criar categoria')
        }
    } catch (error) {
        res.json(error) 
    }
}

//put

const putCategoria = async (req, res) => {
    const id = req.params.id;
    const { name, slug, use_in_menu } = req.body;
        //FALTA O TOKEN PARA O 401

    try {
        const AttCategoria = await tabelaCategoria.update(
            {
                name: name,
                slug: slug,
                use_in_menu: use_in_menu,
            },
            {
                where: {
                    id: id
                }
            }
        );
        if (AttCategoria[0] === 1) {
            resposta.noContent(res);
        } else if (AttCategoria[0] === 0) {
            resposta.notFound(res, `Categoria com id=${id} não foi encontrada`);
        } else {
            resposta.badRequest(res, 'Erro ao atualizar categoria');
        }
    } catch (error) {
        res.json(error);
    }
}

const deleteCategoria = async (req, res) => {
    const id = req.params.id;
    //FALTA O TOKEN PARA O 401
    try {
        const categoriaDelet = await tabelaCategoria.destroy({
            where: {
                id: id
            }
        });
        if (categoriaDelet) {
            resposta.noContent(res);
        } else {
            resposta.notFound(res, `Categoria com id=${id} não foi encontrada`);
        }
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria
}