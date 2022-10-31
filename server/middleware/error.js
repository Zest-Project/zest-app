const logger = require('../logger');

module.exports = function(err, req, res, next) {
    // Log Atlas Error
    logger.log('error', err.message, err);
    res.status(500).send('internal failure in the Server');   
}