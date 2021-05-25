const express = require('express');
const router = express.Router();
const json2xls = require('json2xls');

router.use(json2xls.middleware);

router.post("/", async (req, res) => {
    //res.send(req.body.downloadContent);

    res.xls('data.xlsx', req.body.downloadContent);
    console.log("hi")
    console.log(req.body.downloadContent)
})



module.exports = router;