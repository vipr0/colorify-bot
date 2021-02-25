const Photo = require('../models/photo')

const addPhotoToDB = async (originalUrl, colorizedUrl, owner) => {
    await Photo.create({ originalUrl, colorizedUrl, owner, dateCreated: Date.now() })
}

const countPhotosForToday = async (owner) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0);

    const photosForToday = await Photo.find({ owner, dateCreated: { $gte: today } })
    return photosForToday.length
}

module.exports = { addPhotoToDB, countPhotosForToday }