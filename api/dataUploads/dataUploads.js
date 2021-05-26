const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();
const DataUpload = require('../../models/docs_hdmanager.js')

router.post("/upload", authenticateToken, async (req, res) => {
    if (req.role === req.body.role) {
        const data = new DataUpload({
            email: req.body.email,
            description: req.body.description,
            uploadDate: req.body.uploadDate,
            mobileNo: req.body.mobileNo,
            contentType: req.body.contentType,
            medicalInstitution: req.body.medicalInstitution,
            state: req.body.state,
            organisationId: req.body.organisationId,
            requirements: req.body.requirements
        });

        data.save((err) => {
            if (!err)
                res.sendStatus(201);
            else
                res.sendStatus(501);
        });
    }
    else
        res.send(404)
})



function authenticateToken(req, res, next) {
    // console.log('in authToken')
    // console.log(req.headers['authorization']);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //console.log(token)
    if (token == null) {
        return res.status(401).send({ message: 'Forbidden' })
    }
    else {
        try {
            jwt.verify(token, 'secretHospital', (err, data) => {
                if (err) {
                    return res.sendStatus(403)
                }
                req.role = data.role
                next()
            })
        } catch (e) {
            //console.log(e)
            res.sendStatus(500)
        }
    }


}

module.exports = router;