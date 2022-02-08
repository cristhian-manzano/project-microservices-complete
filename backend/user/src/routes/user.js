const { Router } = require('express');
const { getAll, create } = require('../controllers/user');

const router = Router();

router.get('/users', getAll);
router.post('/users', create);

module.exports = router;
