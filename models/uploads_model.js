const mongoose = require('mongoose');


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