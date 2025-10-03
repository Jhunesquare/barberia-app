const service = require('../services/product.service');

const createProduct = async (req, res) => {
    const data = req.body;
    if(!data.nombre || !data.descripcion){
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await service.createService(data, res);
}

const getAllProducts = async (req, res) =>{

    await service.getAllService(req, res);

}

module.exports = { createProduct, getAllProducts };