const isImageUrl = require('is-image-url');
const { isImageMimetype, colorizePhoto } = require('../utils/photo')
const checkDailyLimitation = require('../middlewares/checkDailyLimitation')

const setupColorize = (bot) => {
    bot.on('document', checkDailyLimitation, async (ctx) => {
        if (!isImageMimetype(ctx.message.document.mime_type)) return ctx.reply(ctx.i18n.t('not_photo'))

        const photoUrl = await ctx.telegram.getFileLink(ctx.message.document.file_id);

        await colorizePhoto(photoUrl, ctx)
    })

    bot.on('photo', checkDailyLimitation, async (ctx) => {
        const photoUrl = await ctx.telegram.getFileLink(ctx.message.photo.slice(-1)[0].file_id)

        await colorizePhoto(photoUrl, ctx)
    })

    bot.hears(isImageUrl, checkDailyLimitation, async (ctx) => {
        await colorizePhoto(ctx.message.text, ctx)
    })
}

module.exports = setupColorize