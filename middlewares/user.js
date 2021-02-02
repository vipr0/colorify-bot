const { getUser } = require('../helpers/db')

const setupUser = (bot) => {
    bot.use(async (ctx, next) => {
        ctx.dbuser = await getUser(ctx.from.id)
        await next()
    })
}

module.exports = setupUser