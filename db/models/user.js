const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    tgId: {
        type: Number,
        required: true,
        unique: true
    },
    language: String,
    premium: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

userSchema.virtual('photosCount', {
    ref: 'User',
    localField: '_id',
    foreignField: 'owner',
    count: true
})

userSchema.pre('find', () => {
    this.populate({ path: 'photosCount' })
})

const User = mongoose.model('User', userSchema)

module.exports = User