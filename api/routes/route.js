const express =require('express')
const router =express.Router()
const part =require('../participants/part')
router.post('/part/add',part.add)
router.get('/part/find',part.find)

module.exports=router