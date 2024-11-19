const scheduleService = require('../services/schedule.service');

const schedule = async (req, res) =>{
    const data = req.body;
    if (!data.idClientes || !data.idBarberia || !data.hora) {
        return res.status(400).json(
            {
                msg: 'error de credenciales'
            }
        )
    }
    await scheduleService.scheduleService(data, res);
}

module.exports = {schedule};