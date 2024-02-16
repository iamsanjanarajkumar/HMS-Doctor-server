// user schema
const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique : [true, "Email already exists"]
    },
    mobile : {
        type: String,
        required: true,
        trim: true,
        unique : [true, "Mobile number already exists"]
    },
    password : {
        type: String,
        required: true,
        trim: true,
    },
    isActive : {
        type: Boolean,
        default: true,
    },
    role : {
        type: String,
        default: "patient",
        enum: ["admin", "patient"],
    },
    isBlocked : {
        type : Boolean,
        default: false
    }
},{
    collection: "patient-register",
    timestamps: true
})

module.exports = mongoose.model("PatientRegister", patientSchema)