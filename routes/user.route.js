const { getUserController } = require('../controllers/user.controller');

const router= require('express').Router();


router.get('/get-user',getUserController)



module.exports=router;