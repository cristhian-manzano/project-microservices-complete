const User = require('../models/user');

const getAll = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json({ data: users, message: 'Get it' });
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAll };
