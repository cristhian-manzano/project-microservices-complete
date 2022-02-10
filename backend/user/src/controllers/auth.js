const { createToken, TOKEN_TYPES, verifyToken } = require('../helpers/jwt');

const { sendEmail } = require('../helpers/email');

const { createValidation } = require('../validations/user');
const User = require('../models/user');

const signUp = async (req, res, next) => {
  try {
    const { error, value } = createValidation(req.body);
    if (error) return res.json({ message: error.message });

    const { _id: id, email } = await User.create(value);

    const token = await createToken({
      id,
      email,
      tokenType: TOKEN_TYPES.VERIFY_ACCOUNT
    });

    await sendEmail({
      to: email,
      subject: 'Verify account',
      html: `<p>Click <a href="http://localhost:3000/api/auth/verify-account/${token}">here</a> to verify your account</p>`
    });

    return res.json({ data: { id, email }, message: 'Get it' });
  } catch (e) {
    return next(e);
  }
};
const verifyAccount = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) return res.status(404).json({ message: 'Token not found!' });

    const user = await verifyToken(token);

    const { modifiedCount } = await User.updateOne(
      { _id: user.id },
      { verified: true }
    );

    if (modifiedCount !== 1)
      return res.status(404).json({ message: 'Cannot verify user!' });

    return res.send('User verified!');
  } catch (e) {
    return next(e);
  }
};

module.exports = { signUp, verifyAccount };
