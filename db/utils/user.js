const User = require('../models/user')

const getUser = async (tgId) => {
    let user = await User.findOne({ tgId })
    
    if (!user) {
        user = new User({ tgId })
        await user.save()
    }
        
    return user
}

const setUserLanguage = async (tgId, lng) => {
    const user = await getUser(tgId)
    user.language = lng
    user.save()
}

const updatePremiumStatus = async(tgId, status) => {
    const user = await getUser(tgId)
    user.premium = status;
    user.save()
}

module.exports = { getUser, setUserLanguage, updatePremiumStatus }