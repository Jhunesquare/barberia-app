const scheduleService = require('../services/schedule.service');

const schedule = async (req, res) =>{
    const data = req.body;
    if (!data.idClientes || !data.idBarberia || !data.hora) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await scheduleService.scheduleService(data, res);
}

const getByBusinessId = async (req, res) => {
    const data = req.body;
    if (!data.idEmpresa) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await scheduleService.getByBusinessId(data, res);
}

const getByClientId = async (req, res) => {
    const data = req.body;
    if (!data.idCliente) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await scheduleService.getByBusinessId(data, res);
}

const getByEmployeeId = async (req, res) => {
    const data = req.body;
    if (!data.idEmpleado) {
        return res.status(400).json({
            msg: 'error de credenciales'
        });
    }
    await scheduleService.getByBusinessId(data, res);
}

module.exports = {schedule, getByBusinessId, getByClientId, getByEmployeeId};