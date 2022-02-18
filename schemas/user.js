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
        type: Number,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    telephoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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