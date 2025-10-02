const service = require('../services/employee.service');

const createEmployee = async (req, res) => {
    const data = req.body;
    if (!data.empresaId || !data.nombre || data.apellido || data.celular || data.estado) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await service.createService(data, res);
}

const getEmployees = async (req, res) => {
    const data = req.body;
    if (!data.empresaId) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await service.getEmployees(data, res);
}

module.exports = { createEmployee, getEmployees };