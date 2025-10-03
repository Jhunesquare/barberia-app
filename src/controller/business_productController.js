const service = require('../services/business_product.service');

const createProduct = async (req, res) => {
    const data = req.body;
    if (!data.empresaId || !data.prodcutoId || !data.precio || !data.duracion) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await service.createService(data, res);
}

const getProductsById = async (req, res) =>{
    const data = req.body;
    if (!data.empresaId) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await service.getAllByEmpresaId(data, res);
}