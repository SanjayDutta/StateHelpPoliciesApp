const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const router = express.Router();

const app = express();


const Hdmanager = require('../../models/hdManager_model.js')
const Medsalesrep = require('../../models/medsales_model.js')

router.post('/HospitalDataManager', (req, res) => {
    // console.log("In HospitalDataManager");
    // console.log(req.body.password);
    Hdmanager.findOne({ organisationId: req.body.organisationId }, async (err, result) => {
        if (!err && result != null) {
            //console.log(result)
            if (await bcrypt.compare(req.body.password, result.password)) {
                //console.log("Login role:" + req.body.role)
                const payload = { role: req.body.role };
                const accessToken = jwt.sign(
                    payload,
                    'secretHospital',
                    // {expiresIn:(2*10)}
                );

                res.status(200).send({ access_token: accessToken, organisationId: result.organisationId });
            }
            else {
                res.sendStatus(404);
            }
        }
        else {
            res.sendStatus(404)
        }
    })
})

router.post('/SalesRep', (req, res) => {
    // console.log("In Sales Rep");
    // console.log(req.body.password);
    Medsalesrep.findOne({ organisationId: req.body.organisationId }, async (err, result) => {
        if (!err && result != null) {
            //console.log(result)
            if (await bcrypt.compare(req.body.password, result.password)) {
                //console.log("Login role:" + req.body.role)
                const payload = { role: req.body.role };
                const accessToken = jwt.sign(
                    payload,
                    'secretMed',
                    // {expiresIn:(2*10)}
                );
                res.status(200).send({ access_token: accessToken, organisationId: result.organisationId });
            }
            else {
                res.sendStatus(404);
            }
        }
        else {
            res.sendStatus(404)
        }
    })
})



module.exports = router;