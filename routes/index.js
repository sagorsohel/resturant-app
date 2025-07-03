const router = require('express').Router();
// Importing routes
const authRouter=require('./auth.route')


router.use('/auth', authRouter);

module.exports= router;