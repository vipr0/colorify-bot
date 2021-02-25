const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        orderReference: {
            type: String,
            required: true
        },
        owner: {
            type: Number,
            required: true,
            ref: 'User'
        },
        transactionStatus: {
            type: String,
            required: true,
        },
        clientName: { type: String },
        amount: { type: Number },
        currency: { type: String },
        email: { type: String },
        phone: { type: String },
        createdDate: { type: Date },
        processingDate: { type: Date },
        cardPan: { type: String },
        cardType: { type: String },
        issuerBankCountry: { type: String },
        issuerBankName: { type: String },
        recToken: { type: String },
        paymentSystem: { type: String },
        acquirerBankName: { type: String },
    }
)

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment