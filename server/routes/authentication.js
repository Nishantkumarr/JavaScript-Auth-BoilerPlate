const express = require('express')
const router=express.Router()


//The controller or the views(Functions) from the controllers

const {
    registerController
} = require('../controllers/authController.js')




//The urls that we generate
router.post('/register',registerController)
module.exports=router
