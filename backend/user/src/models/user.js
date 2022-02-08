const mongoose = require('mongoose');
const { encryptData } = require('../helpers/functions');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  verified: {
    type: Boolean,
    default: false
  }
});

/* eslint func-names: ["error", "never"] */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await encryptData(this.password).catch((e) => next(e));
  next();
});

module.exports = mongoose.model('Users', userSchema);
