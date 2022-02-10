const { verifyToken } = require('../helpers/jwt');

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized!' });

    const token = authHeader.split(' ')[1];
    req.user = await verifyToken(token);
    return next();
  } catch (e) {
    return next(e);
  }
};

const validateTokenType = (tokenType) => (req, res, next) => {
  try {
    if (req.user.tokenType.id !== tokenType.id)
      return res.status(401).json({ message: 'Invalid token!' });

    return next();
  } catch (e) {
    return next(e);
  }
};

module.exports = { validateToken, validateTokenType };
