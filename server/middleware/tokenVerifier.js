const jwt = require('../utils/jwt');
const User = require('../models/user');

/**
 * verfies if a token is valid
 *
 * @param request
 * @param response
 * @param next
 */
const tokenVerifier = async (request, response, next) => {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    response.status(401).end();
    return;
  }
  
  const token = authHeader.split(' ')[1];
  console.log("token: " + token);

  if (!token || !jwt.verifyToken(token)) {
    response.status(401).end();
    return;
  }

  const payload = jwt.decode(token);
  const user = await User.findById(payload.id);

  if (!user) {
    response.status(401).end();
    return;
  }

  // request.body.user = user;
  request.user = user;
  next();
};

/* exports */

module.exports = tokenVerifier;