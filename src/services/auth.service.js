const { db } = require('../utils/firebase');
const bcrypt = require('bcrypt');

const authService = async (req, res) => {
    try {

        //console.log('Correo: ',req.correo);
        const userDocClient = await db.collection('clientes').where('correo', '==', req.correo).get();
        const userSnapshotClient = [];

        userDocClient.docs.forEach(doc => {
            userSnapshotClient.push(doc);
        })

        const userDocBusiness = await db.collection('empresas').where('correo', '==', req.correo).get();
        const userSnapshotBusiness = [];

        userDocBusiness.docs.forEach(doc => {
            userSnapshotBusiness.push(doc);
        })

        if (userSnapshotClient.length == 0 && userSnapshotBusiness.length == 0) {
            return res.status(404).json({
                msg: 'user [' + req.correo + '] no found'
            })
        } else {

            if (userSnapshotClient.length > 0) {
                console.log('Usuario cliente');
            } else {
                console.log('Usuario empresa');
            }

            let { contraseña } = userSnapshot[0].data();
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

module.exports = { authService }