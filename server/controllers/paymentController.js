const AppError = require('../utils/AppError')
const { getWayforpaySignature } = require('../../utils/premium');
const { createPayment, getFirstPaymentStatus, deleteAllPayments } = require('../../db/utils/payment');
const { updatePremiumStatus } = require('../../db/utils/user');
const catchAsync = require('../utils/catchAsync');
const { bot } = require('../../bot/init');

const checkSignature = catchAsync(async(req, res, next) => {
    const signature = getWayforpaySignature("getPaymentResponse", req.body)
    
    console.log(req.body)

    if(signature !== req.body.merchantSignature) {
        return next(new AppError("Wrong signature"))
    }

    next()
})

const writeToPayments = catchAsync(async(req, res, next) => {
    const firstPaymentStatus = await getFirstPaymentStatus(req.body.orderReference)

    if(firstPaymentStatus) {
        await createPayment({owner: firstPaymentStatus.owner, ...req.body})
        req.userTgId = firstPaymentStatus.owner
    }

    next();
})

const acceptApprovedTransaction = catchAsync(async(req, res, next) => {
    if(req.body.transactionStatus === 'Approved') {
        await updatePremiumStatus(req.userTgId, true)
        await bot.telegram.sendMessage(req.userTgId, "You have succesfully bought premium")
    }

    next()
})

const acceptRefundedTransaction = catchAsync(async(req, res, next) => {
    if(req.body.transactionStatus === 'Refunded') {
        await updatePremiumStatus(req.userTgId, false)
        await bot.telegram.sendMessage(req.userTgId, "Premium payment was refunded, returned to normal account")
    }

    next()
})

const deleteExpiredTransaction = catchAsync(async(req, res, next) => {
    const {transactionStatus, orderReference} = req.body

    if(transactionStatus === 'Expired') {
        await deleteAllPayments(orderReference)
    }

    next()
})

const sendResponse = catchAsync(async(req, res, next) => {
    const response = {
        orderReference: req.body.orderReference,
        status: "accept",
        time: Date.now()
    }

    res.json({
        ...response,
        signature: getWayforpaySignature("sendPaymentResponse", response)
    })
})

module.exports = { 
    checkSignature, 
    writeToPayments, 
    acceptApprovedTransaction, 
    acceptRefundedTransaction,
    deleteExpiredTransaction,
    sendResponse
}