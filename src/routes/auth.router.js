const express = require("express");
const {auth} = require("../controller/authController");

const router = express.Router();

router.post("/", auth);
/*
router.get("/lista-barberias", async (req , res) => {
    
    const querySnapshot = await db.collection("barberias").get();

    const barberias = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    console.log(barberias);

    res.send("Hello");

});


router.get('/edit_client/:id', async (req, res) => {

    console.log(req.params.id);

    const doc = await db.collection('clientes').doc(req.params.id).get()

    console.log({
        id: doc.id,
        ...doc.data(),
    });

    res.send('Edit user');
})

router.post('/update_cliente/:id', async (req, res) => {

    console.log(req.params.id);
    console.log(req.body);

    const {id} = req.params;

    await db.collection('clientes').doc(id).update(req.body);

    res.send('user updated');
})
*/
module.exports = {router};