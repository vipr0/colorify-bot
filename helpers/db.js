const User = require('../models/user')

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

module.exports = { getUser, setLanguage }