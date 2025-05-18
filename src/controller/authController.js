const authServices = require('../services/auth.service');

const auth = async (req, res) => {
    const data = req.body;
    //console.log("Email: ", data.correo);
    if(!data.correo || !data.contraseña){
        return res.status(400).json(
            {
                msg: 'error de credenciales'
            }
        )
    }
    await authServices.authService(data, res);
}

module.exports = {auth};