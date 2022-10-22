const express=require('express')
const router= express.Router()

const userController= require('../controllers/userController')
const middleware= require('../middleware/auth')

const addBookController=require('../controllers/addBookController')


///////////////////////////-------user-----------------------//////////////
router.post('/register', userController.register)
router.post('/login', userController.login)
//////////////////////----------addressBook----------------------///////////////////
router.post('/createContact',middleware.authenticate,addBookController.createContact)
router.get('/getContact',middleware.authenticate,addBookController.getContactDetail)
router.get('/getAllContact',middleware.authenticate,addBookController.getAllContactDetail)
router.get('/getAllContactmanual',middleware.authenticate,addBookController.getAllContactDetailManual)
router.put('/updateContact',middleware.authenticate,addBookController.updateContact)
router.delete('/deleteContact',middleware.authenticate,addBookController.deleteContact)





module.exports=router