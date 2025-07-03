const router = require('express').Router();
const verifyToken = require('../middlewares/auth.middleware');
// Importing routes
const authRouter=require('./auth.route')
const userRouter=require('./user.route')


router.use('/auth', authRouter);
router.use('/user',verifyToken, userRouter);

module.exports= router;