const { getUser } = require('../../db/utils/user')

const setupUser = (bot) => {
    bot.use(async (ctx, next) => {
        ctx.dbuser = await getUser(ctx.from.id)
        await next()
    })
}

module.exports = setupUser