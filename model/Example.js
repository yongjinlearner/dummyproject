const mongoose = require('mongoose')

const ExampleSchema = new mongoose.Schema({
    name: String,
    email: String
})

module.exports = mongoose.model('Example', ExampleSchema)