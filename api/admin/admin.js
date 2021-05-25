const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const router = express.Router();
const dbUrl = process.env.mongoDbUrl;


const Uploader = require('../../models/hdManager_model.js')
const Medsalesrep = require('../../models/medsales_model.js');
const app = express();

const Admin = require('../../models/admin_model.js')

router.post('/', (req, res) => {
    Admin.findOne({ email: req.body.email }, async (err, result) => {
        if (!err && result != null) {
            console.log(result)
            if (await bcrypt.compare(req.body.password, result.password)) {
                const payload = { role: req.body.role };
                const accessToken = jwt.sign(
                    payload,
                    'secretAdmin',
                    // {expiresIn:(2*10)}
                );

                res.status(200).send({ secretId: accessToken });
            }
            else {

                res.sendStatus(404);
            }
        }
        else {
            console.log('--Error--')
            console.log(err)
            res.sendStatus(404)
        }
    })

})

router.get('/gethdmanagers', async (req, res) => {
    console.log('In request')
    await Uploader.find((err, results) => {
        if (!err) {
            res.status(200).send(results);
        }
        else {
            console.log("oops")
            res.sendStatus(500);
        }
    })
})

router.get('/getmedsalesreps', async (req, res) => {
    console.log('In request')
    await Medsalesrep.find((err, results) => {
        if (!err) {
            res.status(200).send(results);
        }
        else {
            console.log("oops")
            res.sendStatus(500);
        }
    })
})

router.post('/deleteUser/:userType', (req, res) => {
    if (req.params.userType === 'medsalesreps') {
        Medsalesrep.deleteOne({ _id: req.body._id }, (err) => {
            if (!err) {
                res.sendStatus(201)
            }
            else
                res.sendStatus(404)
        })
    }
    else {
        Uploader.deleteOne({ _id: req.body._id }, (err) => {
            if (!err) {
                res.sendStatus(201)
            }
            else
                res.sendStatus(404)
        })
    }
})

module.exports = router;