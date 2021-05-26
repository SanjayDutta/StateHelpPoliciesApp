const express = require('express');
//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Uploader = require('../../models/hdManager_model.js')
const Medsalesrep = require('../../models/medsales_model.js')

const router = express.Router();
// const dbUrl = "mongodb://localhost:27017/phoenixDB";
// mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// const userRegistrationSchema = {
//     role: String,
//     email: String,
//     organisationId: String,
//     password: String

// }
//const Uploader = mongoose.model('Hdmanager', userRegistrationSchema);
//const Medsalesrep = mongoose.model('Medsalesrep', userRegistrationSchema);


router.post("/", (req, res) => {
    //console.log(req.body.email)
    if (req.body.role === 'Hospital-Data Manager') {
        // console.log('yes')
        Uploader.findOne({ organisationId: req.body.organisationId }, async (err, result) => {
            if (err) {
                //console.log(err)
                res.sendStatus(501);
            }
            else if (!result) {
                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const data = new Uploader({
                        role: req.body.role,
                        email: req.body.email,
                        organisationId: req.body.organisationId,
                        organisationName: req.body.organisationName,
                        organisationAdd: req.body.organisationAdd,
                        fullName: req.body.fullName,
                        dob: req.body.dob,
                        password: hashedPassword
                    });
                    data.save((err) => {
                        if (!err) {
                            const payload = { role: req.body.role };
                            const accessToken = jwt.sign(
                                payload,
                                'secretHospital',
                                // {expiresIn:(2*10)}
                            );
                            res.status(200).send({ access_token: accessToken, organisationId: req.body.organisationId });
                        }
                        else
                            res.send("Database Insertion error");
                    });
                }
                catch {
                    res.status(500).send("Server Error")
                }

            }
            else {
                res.sendStatus(400)
            }

        })
    }
    else {
        Medsalesrep.findOne({ organisationId: req.body.organisationId }, async (err, result) => {
            //console.log(result)
            if (err) {
                //console.log(err)
                res.sendStatus(501);
            }
            else if (!result) {
                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const data = new Medsalesrep({
                        role: req.body.role,
                        email: req.body.email,
                        organisationId: req.body.organisationId,
                        organisationName: req.body.organisationName,
                        organisationAdd: req.body.organisationAdd,
                        fullName: req.body.fullName,
                        dob: req.body.dob,
                        password: hashedPassword
                    });
                    data.save((err) => {
                        if (!err) {
                            //console.log("here")
                            const payload = { role: req.body.role };
                            const accessToken = jwt.sign(
                                payload,
                                'secretMed',
                                // {expiresIn:(2*10)}
                            );
                            res.status(200).send({ access_token: accessToken, organisationId: req.body.organisationId });
                        }

                        else
                            res.send("Database Insertion error");
                    });
                }
                catch {
                    res.status(500).send("Server Error")
                }

            }
            else {
                res.sendStatus(400)
            }
        })
    }
})


module.exports = router;