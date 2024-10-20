const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    content: {type: String, required: false},
    user: {type: String},
    gender: {type: String},
    age: {type: String},
    color: {type: String}
})

module.exports = mongoose.model('Message', schema)