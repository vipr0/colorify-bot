const { countPhotosForToday } = require("../helpers/db");

const checkDailyLimitation = async (ctx, next) => {
    const { tgId, premium } = ctx.dbuser;
    const photosToday = await countPhotosForToday(tgId)

    if (premium || photosToday < 10) {
        next()
    } else {
        ctx.reply('Daily limit reached. Buy premium to colorize without limits')
    }
}

module.exports = checkDailyLimitation