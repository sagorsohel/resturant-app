const { getUserController, updateUserController } = require('../controllers/user.controller');
const upload = require('../middlewares/upload.middleware');

const router= require('express').Router();


router.get('/get-user',getUserController)
router.patch('/update-user',upload.single('profilePhoto'),updateUserController)



module.exports=router;