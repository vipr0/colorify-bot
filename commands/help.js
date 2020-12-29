const setupHelp = (bot) => {
    bot.help((ctx) => {
        ctx.replyWithMarkdown(ctx.i18n.t('help'))
    })
}

module.exports = setupHelp