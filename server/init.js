const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controllers/errorController')
const paymentController = require('./controllers/paymentController')
const userController = require('./controllers/userController')
const jsonParser = require('./utils/jsonParser')
const port = process.env.PORT || 3000;

const startServer = (bot) => {
    const app = express()

    app.use(bot.webhookCallback(`/${bot.webhookPath}`))

    app.use(
        bodyParser.raw({ type: 'application/x-www-form-urlencoded' }),
        jsonParser
    );

    app.post(
        '/payment', 
        paymentController.checkSignature, 
        paymentController.writeToPayments, 
        paymentController.acceptApprovedTransaction,
        paymentController.acceptRefundedTransaction,
        paymentController.deleteExpiredTransaction,
        paymentController.sendResponse
    )

    app.get('/status/:id', userController.getUserPremiumStatus)

    app.use(errorController);

    app.listen(port, () => { console.log('Listening on port' + port)})
}

module.exports = {
    startServer
}