const services = require('../services/business.service');

const createBusiness = async (req, res) => {
    const data = req.body;
    //console.log("Email: ", data.correo);
    if (!data.nombre_establecimiento || !data.nombre_admin || !data.apellido_admin || !data.correo || !data.direccion || !data.contraseña || !data.rol) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await services.createService(data, res);
}

const getAll = async (req, res) => {

    await services.getAllService(req, res);

}

module.exports = { createBusiness, getAll };