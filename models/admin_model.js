const mongoose = require('mongoose');
const dbUrl = process.env.mongoDbUrl;
try {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
        console.log('Success');
    })
} catch (err) {
    console.log(err)
}

const admin = {
    email: String,
    password: String,
    role: String
}

module.exports = mongoose.model('Admin', admin);