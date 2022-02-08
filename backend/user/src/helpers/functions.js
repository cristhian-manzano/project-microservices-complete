const bcrypt = require('bcrypt');

const encryptData = async (data) => {
  const saltRounds = 10;
  return bcrypt.hash(data, saltRounds);
};

const compareHash = async (encrypted, data) => bcrypt.compare(data, encrypted);

module.exports = {
  encryptData,
  compareHash
};
