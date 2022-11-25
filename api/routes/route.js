const express =require('express')
const router =express.Router()
const part =require('../participants/part')
const payment =require('../payments/payment')
router.post('/part/save',part.save)
router.get('/part/id/:id',part.id)

router.post('/payment/verify',payment.verify)
router.get('/part/detail/:pass',part.detail)

module.exports=router