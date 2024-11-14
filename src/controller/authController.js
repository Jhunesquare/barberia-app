const authServices = require('../services/auth.service');

const auth = async (req, res) => {
    const data = req.body;
    if(!data.correo || !data.contraseña){
        return res.status(400).json(
            {
                msg: 'error de credenciales'
            }
        )
    }
    await authServices.authService(req, res)
}