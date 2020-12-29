const { Telegraf } = require('telegraf')
const { v4: uuidv4 } = require('uuid')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

const startBot = (bot) => {
    const domain = process.env.WEBHOOK_URL

    bot.telegram.deleteWebhook()
        .then(async () => {
            const path = uuidv4()
            bot.startWebhook(`/${path}`, undefined, 5000)

            await bot.telegram.setWebhook(`${domain}/${path}`, undefined, 100)
            await bot.launch()
        })
        .catch(console.error)
}


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = { bot, startBot }