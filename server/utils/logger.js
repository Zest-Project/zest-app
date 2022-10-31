const env = require('../startup/config');

/**
 * logs info
 *
 * @param params
 */
const info = (...params) => {

  if (env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

/**
 * logs an error
 *
 * @param params
 */
const error = (...params) => {
  if (env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};