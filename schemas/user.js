const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userFullName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    nationalID: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: Number
    },
    job: {
        type: String
    },
    phoneNumber: {
        type: String,
    },
    telephoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    termsAndConditions: {
        type: Boolean,
        required: true
    },

})

module.exports = mongoose.model('User', userSchema)