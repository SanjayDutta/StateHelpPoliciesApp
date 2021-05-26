const express = require('express');
const router = express.Router();
const json2xls = require('json2xls');

router.use(json2xls.middleware);

router.post("/", async (req, res) => {
    res.xls('data.xlsx', req.body.downloadContent);
})



module.exports = router;