const { showLanguageKeyboard, selectLanguage } = require('../helpers/language')

const setupLanguage = (bot) => {
    bot.command('language', (ctx) => showLanguageKeyboard(ctx))

    bot.action('ua', async (ctx) => await selectLanguage('ua', ctx))
    bot.action('ru', async (ctx) => await selectLanguage('ru', ctx))
    bot.action('en', async (ctx) => await selectLanguage('en', ctx))
}

module.exports = setupLanguage