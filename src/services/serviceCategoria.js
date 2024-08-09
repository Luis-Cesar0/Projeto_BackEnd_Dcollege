const tabelaCategoria = require('../models/tabelaCategoria');
const resposta = require('../responses');


const getCategorias = async (req, res) => {
    try {
        const { limit = 12, page = 1, fields, use_in_menu } = req.query;
        const queryOptions = {};
        if (use_in_menu) {
            queryOptions.where = { use_in_menu: use_in_menu === 'true' };
        }
        if (fields) {
            queryOptions.attributes = fields.split(',');
        }
        if (parseInt(limit) !== -1) {
            queryOptions.limit = parseInt(limit);
            queryOptions.offset = (parseInt(page) - 1) * parseInt(limit);
        }

        const categorias = await tabelaCategoria.findAndCountAll(queryOptions);
        const response = {
            data: categorias.rows,
            total: categorias.count,
            limit: parseInt(limit),
            page: parseInt(limit) === -1 ? null : parseInt(page)
        };

        if (categorias.rows.length > 0) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json({ mensagem: 'Nenhuma categoria encontrada' });
        }
    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro na requisição', erro: error.message });
    }
};



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
const postCategoria = async (req, res) => {
    const { name,slug,use_in_menu } = req.body;
    const token = req.headers.authorization;

    if (!token) {
        return resposta.unauthorized(res, 'Token de autorização não fornecido');
    }

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


const putCategoria = async (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    const { name, slug, use_in_menu } = req.body;
        //TOKEN PARA O 401
        if (!token) {
            return resposta.unauthorized(res, 'Token de autorização não fornecido');
        }

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
    const token = req.headers.authorization;
    //FALTA O TOKEN PARA O 401
    if (!token) {
        return resposta.unauthorized(res, 'Token de autorização não fornecido');
    }

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