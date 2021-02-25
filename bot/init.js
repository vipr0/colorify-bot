const { Telegraf } = require('telegraf')
const { v4: uuidv4 } = require('uuid')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.webhookPath = uuidv4();

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

const startBot = (bot) => {
    const domain = process.env.WEBHOOK_DOMAIN

    bot.telegram.deleteWebhook()
        .then(async () => {
            await bot.telegram.setWebhook(`${domain}/${bot.webhookPath}`)

            console.log('New webhook was set successfully')
        })
        .catch(console.error)
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = { bot, startBot }