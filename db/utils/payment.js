const Payment = require('../models/payments')

const createPayment = async (payment) => {
    await Payment.create(payment)
}

const getFirstPaymentStatus = async (orderReference) => {
    return await Payment.findOne({orderReference, transactionStatus: "Initial"})
}

const deleteAllPayments = async (orderReference) => {
    await Payment.deleteMany({orderReference})
}

module.exports = { createPayment, getFirstPaymentStatus, deleteAllPayments }