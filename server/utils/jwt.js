const jwt = require('jsonwebtoken');
const env = require('../utils/env');

/**
 * signs a token
 *
 * @param username
 * @param email
 * @param id
 * @returns {jwt.Token}
 */
const signToken = (username, email, id, tokenId) => {
  const userForToken = { username, email, id, tokenId };
  return jwt.sign(userForToken, env.JWT_SECRET);
};

/**
 * verifies a token
 *
 * @param token
 * @returns {*}
 */
const verifyToken = (token) => {

  try {
    return jwt.verify(token, env.JWT_SECRET);

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