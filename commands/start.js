const { showLanguageKeyboard } = require('../helpers/language')

const setupStart = (bot) => {
    bot.start(async (ctx) => showLanguageKeyboard(ctx))
}

module.exports = setupStart