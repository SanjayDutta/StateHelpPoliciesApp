const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
mongoose.set('bufferCommands', false);
//const Test = mongoose.model('Test', medicalRequirementsSchema);

const Upload = require('../../models/uploads_model.js');
const UploadDocs = require('../../models/docs_hdmanager.js')

/*
get all data - "/get-all" 
502 for no data
200 success data fetch return

get one particular data - "/get-one/dataId"
post one new data - "/post-data"

delete all posts(should be an admin feature)
 */

router.get("/getAll", async (req, res) => {
    await Upload.find((err, results) => {
        if (!err) {
            res.status(200).send(results);
        }
        else {
            console.log("oops")
            res.sendStatus(500);
        }
    })
})


router.get("/getAll/:orgId", async (req, res) => {

    await Upload.find(({ organisationId: req.params.orgId }), (err, results) => {
        if (!err) {
            res.status(200).send(results);
        }
        else {
            console.log("oops")
            res.sendStatus(500);
        }
    })
})


router.get("/getDocs/:orgId", async (req, res) => {
    console.log('called')
    console.log("orgid:" + req.params.orgId);
    await UploadDocs.find(({ organisationId: req.params.orgId }), async (err, results) => {
        if (!err) {
            await res.status(200).send(results);
        }
        else {
            console.log("oops")
            res.sendStatus(500);
        }
    })


})


router.get("/getDocs", async (req, res) => {

    console.log('Here')
    UploadDocs.find((err, results) => {
        if (!err) {
            res.status(200).send(results);
        }
        else {
            console.log("oops")
            res.sendStatus(500);
        }
    })

})

router.post("/upload", authenticateToken, (req, res) => {
    console.log(req.body.requirements)
    if (req.role === req.body.role) {
        const data = new Upload({
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

// router.delete("/deleteAll", (req, res) => {
//     Test.deleteMany((err) => {
//         if (!err)
//             res.sendStatus(204)
//         else
//             res.send(err)
//     })
// })


// //all the following are for a single data
// router.route('/singleRecord/:medicalDataId')
//     .get((req, res) => {
//         //getting a single record
//         Test.findOne({ medicalDataId: req.params.medicalDataId }, (err, result) => {
//             if (!err)
//                 res.sendStatus(200).send(result);
//             else
//                 res.send(err);
//         })
//     })
//     .patch((req, res) => {
//         Test.update(
//             { medicalDataId: req.params.medicalDataId },
//             {/*$set: req.body*/ },
//             function (err) {
//                 if (!err)
//                     res.sendStatus(204);
//                 else
//                     res.send(err);
//             }
//         )
//     })
//     .delete((req, res) => {
//         Test.deleteOne({/*conditions */ }, (err) => {
//             if (!err)
//                 res.sendStatus(200)
//             else
//                 res.send(err)
//         })
//     });


function authenticateToken(req, res, next) {
    console.log('in authToken')
    console.log(req.headers['authorization']);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log(token)
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
            console.log(e)
            res.sendStatus(500)
        }
    }


}

module.exports = router;