const { db } = require("../firebase");
const bcrypt = require('bcrypt');

const createService = async (rq, res) => {
    const { nombre, apellido, correo } = req;

    let { contraseña } = req;
    const salt = bcrypt.genSaltSync();
    contraseña = bcrypt.hashSync(contraseña, salt);

    try {

        const data = await db.collection('barberias').where('correo', '==', req.correo).get();
        const dataSnapshot = [];

        data.docs.forEach(doc => {
            dataSnapshot.push(doc);
        });

        if (dataSnapshot.length == 0) {
            await db.collection('barberias').add({
                nombre,
                barberoNombre,
                direccion,
                correo,
                contraseña
            })

            return res.status(201).json({
                msg: 'usuario [' + data.correo + '] creado exitosamente'
            });


        } else {
            return res.status(406).json({
                msg: 'usuario [' + data.correo + '] ya tiene cuenta'
            });
        }
    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }

    console.log(nombre, apellido, correo, contraseña);
}

module.exports = {createService};