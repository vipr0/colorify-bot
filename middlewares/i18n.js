const TelegrafI18n = require('telegraf-i18n')
const { setLocale } = require('../helpers/language')

const i18n = new TelegrafI18n({
    directory: `${__dirname}/../locales`,
    defaultLanguage: 'en',
    sessionName: 'session',
    useSession: false,
    allowMissing: true,
    skipPluralize: true,
    fallbackToDefaultLanguage: true,
})

const setupI18N = (bot) => {
    bot.use(i18n.middleware())
    bot.use(async (ctx, next) => {
        const { language } = ctx.dbuser
        if(language) setLocale(language, ctx)

        await next()
    })
}

module.exports = setupI18N