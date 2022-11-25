const express =require('express')
const router =express.Router()
const part =require('../participants/part')
const payment =require('../payments/payment')
router.post('/part/add',part.add)
router.get('/part/find',part.find)
router.post('/payment/order',payment.order)
router.post('/payment/verify',payment.verify)
router.get("/part/id/:id",part.id)

module.exports=router