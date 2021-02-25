const { showLanguageKeyboard } = require('../utils/language')

const setupStart = (bot) => {
    bot.start(async (ctx) => showLanguageKeyboard(ctx))
}

module.exports = setupStart