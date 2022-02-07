const { Router } = require('express');

const router = Router();

router.get('/auth', (req, res, next) => {
  try {
    JSON.parse('-{}');
    // throw new Error('Bad route!!!');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
