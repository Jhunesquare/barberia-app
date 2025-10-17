const { db } = require('../utils/firebase');

const createService = async (req, res) => {
    
    const { nombre, descripcion } = req;

    try {

        const data = await db.collection('producto').where('nombre', '==', req.nombre).get();
        const dataSnapshot = [];

        data.docs.forEach(doc => {
            dataSnapshot.push(doc);
        });

        if (dataSnapshot.length == 0) {
            await db.collection('producto').add({
                nombre,
                descripcion
            });

            return res.status(201).json({
                msg: 'producto [' + data.nombre + '] agregado exitosamente'
            });

        } else {
            return res.status(406).json({
                msg: 'producto [' + data.nombre + '] ya existente'
            });
        }
        
    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }
}

const getAllService = async (req, res) => {

    try {

        const querySnapshot = await db.collection('producto').get();

        if (querySnapshot.empty) {

            res.status(404).json({
                msg: 'no data'
            });

        } else {

            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(products);

            res.status(200).json({
                msg: 'OK',
                data_list: products
            });
            
        }
        
    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }
}

module.exports = { createService, getAllService };