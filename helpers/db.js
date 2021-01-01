const User = require('../models/user')
const Photo = require('../models/photo')

const getUser = async (id) => {
    let user = await User.findOne({ tgId: id })
    if (!user) {
        user = new User({ tgId: id })
        await user.save()
    }

    return user
}

const setLanguage = async (id, lng) => {
    const user = await getUser(id)
    user.language = lng
    user.save()
}

const addPhotoToDB = async (originalUrl, colorizedUrl, owner) => {
    await Photo.create({ originalUrl, colorizedUrl, owner, dateCreated: Date.now() })
}

const countPhotosForToday = async (owner) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0);

    const photosForToday = await Photo.find({ owner, dateCreated: { $gte: today } })
    return photosForToday.length
}

module.exports = { getUser, setLanguage, addPhotoToDB, countPhotosForToday }