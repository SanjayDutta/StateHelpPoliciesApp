const mongoose = require('mongoose');
const admin = {
    email: String,
    password: String,
    role: String
}
module.exports = mongoose.model('Admin', admin);