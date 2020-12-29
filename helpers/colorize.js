const { Markup, Extra } = require('telegraf')
const deepai = require('deepai')

deepai.setApiKey(process.env.DEEPAI_TOKEN);

const colorizePhoto = async (photoUrl, ctx) => {
    const resp = await deepai.callStandardApi("colorizer", {
        image: photoUrl,
    });

    ctx.replyWithPhoto(
        { url: resp.output_url },
        Extra.inReplyTo(ctx.message.message_id).markup(Markup.inlineKeyboard([Markup.urlButton('Full image URL', resp.output_url)]))
    )
}

module.exports = colorizePhoto