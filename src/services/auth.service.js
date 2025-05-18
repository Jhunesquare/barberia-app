const {db} = require("../utils/firebase");
const bcrypt = require('bcrypt');

const authService = async (req, res) =>{
    try {

        //console.log('Correo: ',req.correo);
        const userDoc = await db.collection('clientes').where('correo', '==', req.correo).get();
        const userSnapshot = [];

        userDoc.docs.forEach(doc =>{
            userSnapshot.push(doc);
        })

        if(userSnapshot.length == 0){
            return res.status(404).json({
                msg: 'user [' + req.correo + '] no found'
            })
        }else{
            
            let {contraseña} = userSnapshot[0].data();
            const validateContra = bcrypt.compareSync(req.contraseña, contraseña);
            if (!validateContra) {
                return res.status(404).json({
                    msg: 'contraseña incorrecta'
                })
            }

            return res.status(200).json({
                msg: 'usuario [' + req.correo + '] logueado correctamente'
            })
            
        }


        
    } catch (e) {
        return res.status(400).json({
            msg: 'user [' + req.correo + '] no found'
        })
    }
}

module.exports = {authService}