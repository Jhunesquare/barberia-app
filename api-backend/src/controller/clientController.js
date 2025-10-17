const clientServices = require('../services/client.service');

const createUser = async (req, res) => {
    const data = req.body;
    //console.log("Email: ", data.correo);
    if (!data.correo || !data.contraseña || !data.nombre || !data.apellido || !data.celular) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await clientServices.createService(data, res);
}

const getAll = async (req, res) => {
    await clientServices.getAllService(req, res);
}

const getById = async (req, res) => {
    const data = req.body;
    if (!data.id) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await clientServices.getByIdService(data, res);
}

module.exports = { createUser, getAll, getById };