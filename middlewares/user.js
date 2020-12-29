const { getUser } = require('../helpers/db')

const setupUser = (bot) => {
    bot.use(async (ctx, next) => {
        ctx.dbuser = await getUser(ctx.from.id)
        next()
    })
}

module.exports = setupUser