const services = require('../services/employee.service')

const createEmployee = async (req, res) => {
    const data = req.body;
    //console.log("Email: ", data.correo);
    if (!data.nombre || !data.barberoNombre || !data.correo || !data.direccion || !data.contraseña) {
        return res.status(400).json(
            {
                msg: 'error de credenciales'
            }
        )
    }
    await services.createService(req, res);
}

module.exports = {createEmployee}