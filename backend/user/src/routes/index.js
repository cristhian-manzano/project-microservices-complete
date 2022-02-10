const { Router } = require('express');

// Routes
const authRoutes = require('./auth');
const userRoutes = require('./user');

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
