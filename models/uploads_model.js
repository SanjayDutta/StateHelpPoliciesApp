const mongoose = require('mongoose');
const dbUrl = process.env.mongoDbUrl;

// try {
//     mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
//         console.log('Success');
//     })
// } catch (err) {
//     console.log(err)
// }

mongoose.Promise = global.Promise;
connect = () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true }).then(console.log('Database Connected')).catch(err => { console.log(err) });
}



const medicalRequirementsSchema = {
    email: String,
    description: String,
    uploadDate: String,
    mobileNo: String,
    contentType: String,
    medicalInstitution: String,
    state: String,
    userId: String,
    organisationId: String,
    requirements: Array

}

module.exports = mongoose.model('Upload', medicalRequirementsSchema);