const { registerController, loginController } = require('../controllers/auth.controller');

const router= require('express').Router();



router.post('/register',registerController)
router.post('/login',loginController)


module.exports=router;