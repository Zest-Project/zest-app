const jwt = require('jsonwebtoken');
// const env = require('../startup/config');

/**
 * signs a token
 *
 * @param username
 * @param email
 * @param id
 * @returns {jwt.Token}
 */
const signToken = (username, id) => {
  const userForToken = { username, id};
  return jwt.sign(userForToken, process.env.JWT_SECRET);
};

/**
 * verifies a token
 *
 * @param token
 * @returns {*}
 */
const verifyToken = (token) => {

  try {
    return jwt.verify(token, process.env.JWT_SECRET);

  } catch (e) {
    return false;
  }
};

/**
 * decodes a token
 *
 * @param token
 * @returns {{payload: *, signature: *, header: *}|null}
 */
const decode = (token) => {

  try {
    return verifyToken(token) ? jwt.decode(token) : null;
  
  } catch (error) {
    return null;
  }
};

/* exports */

module.exports = {
  signToken,
  verifyToken,
  decode
};