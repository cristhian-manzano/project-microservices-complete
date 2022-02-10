const { Router } = require('express');
const { getAll } = require('../controllers/user');

const router = Router();

router.get('/users', getAll);

module.exports = router;
