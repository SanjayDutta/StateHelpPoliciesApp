const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const router = express.Router();

const app = express()

router.post('/', authenticateToken, (req, res) => {
    if (req.role === req.body.role) {
        console.log('Sending')
        res.send(200)
    }
    else {
        console.log(req.role)
        console.log(req.body.role)
        res.send(404)
    }

})

function authenticateToken(req, res, next) {
    console.log(req.body)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) {
        return res.status(401).send({ message: 'Forbidden' })
    }

    if (req.body.role === 'Medical Sale Representative') {

        jwt.verify(token, 'secretMed', (err, data) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.role = data.role
            next()
        })
    }
    else if (req.body.role === 'Hospital-Data Manager') {
        console.log('token found, checking role')
        jwt.verify(token, 'secretHospital', (err, data) => {
            if (err) {
                return res.sendStatus(403)
            }
            console.log("verified")
            console.log(data)
            req.role = data.role
            next()
        })
    }
    else if (req.body.role === 'Admin') {
        console.log('token found, checking role')
        jwt.verify(token, 'secretAdmin', (err, data) => {
            if (err) {
                return res.sendStatus(403)
            }
            console.log("verified")
            console.log(data)
            req.role = data.role
            next()
        })
    }
    else {
        res.sendStatus(500)
    }
}


module.exports = router;