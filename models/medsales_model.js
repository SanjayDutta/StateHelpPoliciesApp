const mongoose = require('mongoose');
const dbUrl = process.env.mongoDbUrl;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const userRegistrationSchema = {
    role: String,
    email: String,
    password: String,
    organisationId: String,
    organisationName: String,
    organisationAdd: String,
    fullName: String,
    dob: String

}

module.exports = mongoose.model('Medsalesrep', userRegistrationSchema);