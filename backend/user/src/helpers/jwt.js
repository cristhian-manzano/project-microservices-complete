require('dotenv').config();
const jwt = require('jsonwebtoken');
const Logger = require('../config/winston');

const TOKEN_TYPES = {
  VERIFY_ACCOUNT: { id: 'verify-account', expiresIn: 60 * 5 },
  RESET_PASSWORD: { id: 'reset-password', expiresIn: 60 * 3 },
  SESION_USER: { id: 'sesion-user', expiresIn: 60 * 60 * 24 }
};

// Functions
const createToken = (data) => {
  if (!data || typeof data !== 'object')
    throw new Error('data has to be and object!');

  if (!data.tokenType)
    throw new Error('data has to have a tokenType attribute');

  Logger.info(`Data JWT:  ${JSON.stringify(data)}`);
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.JWT_PRIVATE_KEY,
      { algorithm: 'HS256', expiresIn: data.tokenType.expiresIn },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

module.exports = { createToken, verifyToken, TOKEN_TYPES };
