const mongoose = require('mongoose');
const dbUrl = process.env.mongoDbUrl;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const userRegistrationSchema = {
    role: String,
    email: String,
    organisationId: String,
    password: String,
    organisationName: String,
    organisationAdd: String,
    fullName: String,
    dob: String

}

module.exports = mongoose.model('Hdmanager', userRegistrationSchema);