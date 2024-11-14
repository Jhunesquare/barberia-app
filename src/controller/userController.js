const { Router } = require("express");
const {db} = require("../firebase");
const bcrypt = require('bcrypt');

const router = Router();

router.post('/register', async (req, res) => {

    const { nombre, apellido, correo } = req;

    let {contraseña} = req;
    const salt = bcrypt.genSaltSync();
    constraseña = bcrypt.hashSync(contraseña, salt);

    try {
        
        const data = await db.collection('clientes').where('correo','==', req.correo).get();
        const dataSnapshot = [];

        data.docs.forEach(doc => {
            dataSnapshot.push(doc);
        });

        if (dataSnapshot.length == 0) {
            await db.collection('clientes').add({
                nombre,
                apellido,
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
    } catch (error) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }

    console.log(nombre, apellido, correo, contraseña);

})