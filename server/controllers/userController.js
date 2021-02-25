const User = require('../../db/models/user');
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync');


const getUserPremiumStatus = catchAsync(async(req, res, next) => {
    const user = await User.findOne({ tgId: req.params.id })

    console.log(user)

    if(!user) {
        return next(new AppError('No user associated with this telegram id'))
    }

    res.json({
        status: "success",
        data: { premium: user.premium}
    })
})

module.exports = { getUserPremiumStatus }