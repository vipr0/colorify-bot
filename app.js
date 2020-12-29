require('dotenv').config({ path: `${__dirname}/.env`})

const { bot, startBot } = require('./init/bot')
const setupMongoose = require('./init/mongoose')
const setupI18N = require('./middlewares/i18n')
const setupUser = require('./middlewares/user')
const setupStart = require('./commands/start')
const setupColorize = require('./commands/colorize')
const setupHelp = require('./commands/help')
const setupLanguage = require('./commands/language')

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

startBot(bot)