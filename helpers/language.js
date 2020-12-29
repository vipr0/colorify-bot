const { Markup } = require('telegraf')

const { setLanguage } = require('../helpers/db')

const showLanguageKeyboard = (ctx) => {
    return ctx.reply(
        'Select language',
        Markup.inlineKeyboard([
            Markup.callbackButton('🇺🇦 Українська', 'ua'),
            Markup.callbackButton('🇷🇺 Русский', 'ru'),
            Markup.callbackButton('🇺🇸 English', 'en')
        ]).extra()
    )
}

const selectLanguage = async (lng, ctx) => {
    await setLanguage(ctx.dbuser.tgId, lng)

    setLocale(lng, ctx)

    await ctx.reply(ctx.i18n.t('language_selected'))
    await ctx.replyWithMarkdown(ctx.i18n.t('start', { botName: ctx.botInfo.first_name }))
}

const setLocale = (lng, ctx) => {
    ctx.i18n.locale(lng)
}

module.exports = { showLanguageKeyboard, selectLanguage, setLocale }