const { Markup, Extra } = require('telegraf')
const { wayforpay, generatePaymentParams } = require("../../utils/premium");
const { createPayment } = require('../../db/utils/payment');

const setupPremium = (bot) => {
    bot.command('premium', async (ctx) => {
        const accountType = ctx.dbuser.premium ? ctx.i18n.t('premium') : ctx.i18n.t('normal')

        ctx.replyWithMarkdown(
            ctx.i18n.t('account_status', { accountType }),
            !ctx.dbuser.premium && Extra.markup(Markup.inlineKeyboard([Markup.callbackButton(ctx.i18n.t('buy_button'), 'buy_button')]))
        )
    })

    bot.action('buy_button', async (ctx) => {
        if(ctx.dbuser.premium) return ctx.reply(ctx.i18n.t('already_premium'));

        const params = generatePaymentParams(ctx.from.id)
        const link = wayforpay.generatePurchaseUrl(params);

        await createPayment({
            orderReference: params.orderReference, 
            owner: ctx.from.id, 
            transactionStatus: "Initial",
            createdDate: Date.now()
        })

        ctx.reply(
            ctx.i18n.t('click_to_buy'),
            Extra.markup(
                Markup.inlineKeyboard(
                    [Markup.urlButton(ctx.i18n.t('buy_subscription'), link)]
            ))
        )
    })
}

module.exports = setupPremium