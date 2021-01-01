const { Markup, Extra } = require('telegraf')
const deepai = require('deepai');
const { addPhotoToDB } = require('./db');

deepai.setApiKey(process.env.DEEPAI_TOKEN);

const colorizePhoto = async (image, ctx) => {
    try {
        const { output_url } = await deepai.callStandardApi("colorizer", { image });

        await addPhotoToDB(image, output_url, ctx.dbuser.tgId)

        ctx.replyWithPhoto(
            { url: output_url },
            Extra
                .inReplyTo(ctx.message.message_id)
                .markup(Markup.inlineKeyboard([Markup.urlButton('Full image URL', output_url)]))
        )
    } catch (err) {
        ctx.replyWithMarkdown(ctx.i18n.t('colorize_error'), Extra.inReplyTo(ctx.message.message_id))
        console.log(err)
    }
}

module.exports = colorizePhoto