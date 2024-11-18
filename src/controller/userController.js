const userServices = require('../services/user.service');

const createUser = async(req, res) =>{
    const data = req.body;
    //console.log("Email: ", data.correo);
    if(!data.correo || !data.contraseña || !data.nombre || !data.apellido){
        return res.status(400).json(
            {
                msg: 'error de credenciales'
            }
        )
    }
    await userServices.createService(data, res);
}

module.exports = {createUser};