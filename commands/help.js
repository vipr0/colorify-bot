const setupHelp = (bot) => {
    bot.help((ctx) => {
        console.log(ctx)
        ctx.replyWithMarkdown(ctx.i18n.t('help'))
    })
}

module.exports = setupHelp