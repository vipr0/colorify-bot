const { countPhotosForToday } = require("../../db/utils/photo");

const checkDailyLimitation = async (ctx, next) => {
    const { tgId, premium } = ctx.dbuser;
    const photosToday = await countPhotosForToday(tgId)

    if (premium || photosToday < 10) {
        await next()
    } else {
        ctx.reply('Daily limit reached. Buy premium to colorize without limits')
    }
}

module.exports = checkDailyLimitation