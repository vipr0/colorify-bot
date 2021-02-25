const { Extra } = require('telegraf');
const deepai = require('deepai');
const { addPhotoToDB } = require('../../db/utils/photo');

deepai.setApiKey(process.env.DEEPAI_TOKEN);

const isImageMimetype = (mimetype) => {
    return /^image/.test(mimetype)
}

const applyColorizer = async(image) => {
    const { output_url } = await deepai.callStandardApi("colorizer", { image });
    return output_url;
}

const applySuperResolution = async(image) => {
    return await deepai.callStandardApi("waifu2x", { image });
}

const colorizePhoto = async (image, ctx) => {
    try {
        await ctx.replyWithChatAction('upload_photo')

        const colorizedPhotoUrl = await applyColorizer(image)

        await addPhotoToDB(image, colorizedPhotoUrl, ctx.dbuser.tgId)

        ctx.replyWithPhoto(
            { url: colorizedPhotoUrl },
            Extra.inReplyTo(ctx.message.message_id)
        )

        if(ctx.dbuser.premium) {
            const {id, output_url} = await applySuperResolution(colorizedPhotoUrl)
            ctx.replyWithDocument({url: output_url, filename: `${id}.jpg`})
        }
    } catch (err) {
        ctx.replyWithMarkdown(ctx.i18n.t('colorize_error'), Extra.inReplyTo(ctx.message.message_id))
        console.log(err)
    }
}


module.exports = { isImageMimetype, colorizePhoto }