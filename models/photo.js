const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true
        },
        colorizedUrl: {
            type: String,
            required: true
        },
        owner: {
            type: Number,
            ref: 'User'
        },
        dateCreated: {
            type: Date
        }
    }
)

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo