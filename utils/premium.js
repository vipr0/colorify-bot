const WayForPay = require('wayforpay');
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto');
const _ = require('lodash');
const utf8 = require('utf8');

const wayforpay = new WayForPay(process.env.WAYFORPAY_LOGIN, process.env.WAYFORPAY_PASSWORD);

const generatePaymentParams = () => {
    return {
        merchantDomainName: 'colorifybot.com',
        merchantTransactionSecureType: 'AUTO',
        orderReference: uuidv4(),
        orderDate: Date.now(),
        amount: '1.99',
        currency: 'USD',
        productName: 'Colorify Bot Premium',
        productPrice: '1.99',
        productCount: "1",
        serviceUrl: `${process.env.WEBHOOK_DOMAIN}/payment`,
        orderTimeout: 9999999999999999,
        orderLifetime: 9999999999999999,
    }
}

const getWayforpaySignature = (type, fields) => {
    const requiredFields = getRequiredFields(type);

    let arrFileds = _.keys(fields);
    let arrValues = [];

    requiredFields.forEach(field => {
        if (!arrFileds.includes(field)) {
            throw new Error('Missed signature field: ' + field);
        } else {
            arrValues.push(fields[field])
        }
    })

    let secret = arrValues.join(';');
    let buffer = utf8.encode(secret);

    const hash = crypto
        .createHmac('md5', process.env.WAYFORPAY_PASSWORD)
        .update(buffer)
        .digest('hex');

    return hash
}

const getRequiredFields = (type) => {
    switch (type) {
        case "getPaymentResponse":
            return ['merchantAccount', 
                    'orderReference', 
                    'amount', 
                    'currency', 
                    'authCode', 
                    'cardPan', 
                    'transactionStatus', 
                    'reasonCode']
        case "sendPaymentResponse":
            return ["orderReference", "status", "time"]
        default:
            return []
    }
}

module.exports = {
    wayforpay,
    getWayforpaySignature,
    generatePaymentParams
}