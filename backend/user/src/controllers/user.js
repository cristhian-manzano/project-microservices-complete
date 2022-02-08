const User = require('../models/user');
const { createValidation } = require('../validations/user');

const getAll = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json({ data: users, message: 'Get it' });
  } catch (e) {
    return next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { error, value } = createValidation(req.body);

    if (error) return res.json({ message: error.message });

    const created = await User.create(value);

    return res.json({ data: created, message: 'Get it' });
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAll, create };
