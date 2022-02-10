const { Router } = require('express');
const { signUp, verifyAccount } = require('../controllers/auth');

const router = Router();

// router.use(validateToken);

router.post('/signup', signUp);
router.get('/verify-account/:token', verifyAccount);

module.exports = router;
