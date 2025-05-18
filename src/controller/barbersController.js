const {verifyToken} = require('../utils/jwt');
const services = require('../services/barbers.service');

const createBarber = async (req, res) => {
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

const getAll = async (req, res) => {

    try {
        const { authorization } = req.headers;
        const auth = verifyToken(authorization);

        if (!auth.status) {
            return res.status(auth.statusCode).json({
                msg: auth.msg
            });
        } else if (auth.decoded.rol != 1) {
            return res.status(401).json({
                msg: 'unauthorized'
            });
        }

        await services.getAllService(req, res);

    } catch (e) {
        res.status(401).json({
            msg: 'unauthorized',
            error: e
        });
    }

}

module.exports = { createBarber, getAll }