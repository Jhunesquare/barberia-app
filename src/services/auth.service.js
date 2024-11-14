const { Router } = require("express");
const {db} = require("../firebase");
const bcrypt = require('bcrypt');

const router = Router();

router.post('/login', async (req, res) => {


    let {contraseña} = userSnapshot[0].data();
    const validateContra = bcrypt.compareSync(req.contraseña, contraseña);
    if (!validateContra) {
        return res.status(404).json({
            msg: 'contraseña incorrecta'
        })
    }
})