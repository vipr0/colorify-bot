const setupHelp = (bot) => {
    bot.help(async (ctx) => {
        await ctx.replyWithMarkdown(ctx.i18n.t('help')) 
    })
}

module.exports = setupHelp