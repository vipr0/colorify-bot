const { Markup, Extra } = require('telegraf')
const deepai = require('deepai')

deepai.setApiKey(process.env.DEEPAI_TOKEN);

const colorizePhoto = async (image, ctx) => {
    try {
        const resp = await deepai.callStandardApi("colorizer", { image });

        ctx.replyWithPhoto(
            { url: resp.output_url },
            Extra
                .inReplyTo(ctx.message.message_id)
                .markup(Markup.inlineKeyboard([Markup.urlButton('Full image URL', resp.output_url)]))
        )
    } catch (err) {
        ctx.replyWithMarkdown(ctx.i18n, t('colorize_error'), Extra.inReplyTo(ctx.message.message_id))
        console.log(err)
    }
}

module.exports = colorizePhoto