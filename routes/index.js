const router = require('express').Router();
// Importing routes
const authRouter=require('./auth.route')


router.use('/api/v1/auth', authRouter);

module.exports= router;