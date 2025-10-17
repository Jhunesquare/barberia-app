const { db } = require('../utils/firebase');

const createService = async (req, res) => {

    const { empresaId, prodcutoId, precio, duracion } = req;

    try {

        const data = await db.collection('empresa_producto').where('empresaId', '==', req.empresaId).where('productoId', '==', req.prodcutoId).get();
        const dataSnapshot = [];

        data.docs.forEach(doc => {
            dataSnapshot.push(doc);
        });

        if (dataSnapshot.length == 0) {

            await db.collection('empresa_producto').add({
                empresaId,
                prodcutoId,
                precio,
                duracion
            });

            return res.status(201).json({
                msg: 'producto [' + data.empresaId + ' ' + data.prodcutoId + '] agregado exitosamente'
            });

        } else {

            return res.status(406).json({
                msg: 'producto [' + data.empresaId + ' ' + data.prodcutoId + '] ya existente'
            });
            
        }
        
    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }
}

const getAllByEmpresaId = async (req, res) => {

    const empresaId = req;

    try {

        const querySnapshot = await db.collection('empresa_producto').where('empresaId', '==', req.empresaId).get();
        
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

module.exports = { createService, getAllByEmpresaId };