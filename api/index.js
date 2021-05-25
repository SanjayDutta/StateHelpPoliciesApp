const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express()
app.use(bodyParser.json());
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

router.post("/track-data", (req, res) => {
    console.log("Stored data!", req.body.data);
    res.status(200).send({ message: "Success" });
})

const medicalData = require('./medicalData/medicalData');
router.use('/medicalData', medicalData);

const downloadData = require('./downloadData/downloadData');
router.use('/downloadData', downloadData);

const register = require('./register/register');
router.use('/register', register);

const authenticateToken = require('./auth/auth')
router.use('/auth', authenticateToken)

const checkLogin = require('./login/login')
router.use('/login', checkLogin)

const dataUploads = require('./dataUploads/dataUploads')
router.use('/dataUpload', dataUploads);

const admin = require('./admin/admin');
router.use('/admin', admin)

module.exports = {
    path: "/api",
    handler: router
}

