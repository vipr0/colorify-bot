require('dotenv').config({ path: `${__dirname}/.env` })

const { bot, startBot } = require('./bot/init')
const { startServer } = require('./server/init')
const setupMongoose = require('./db/init')
const setupI18N = require('./bot/middlewares/i18n')
const setupUser = require('./bot/middlewares/user')
const setupStart = require('./bot/commands/start')
const setupColorize = require('./bot/commands/colorize')
const setupHelp = require('./bot/commands/help')
const setupLanguage = require('./bot/commands/language')
const setupPremium = require('./bot/commands/premium')

// INIT
setupMongoose()

// MIDDLEWARES
setupUser(bot)
setupI18N(bot)
setupStart(bot)

// COMMANDS
setupLanguage(bot)
setupHelp(bot)
setupColorize(bot)
setupPremium(bot)

startBot(bot)
startServer(bot)