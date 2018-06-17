const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: 'iag-test',
    level: process.env.LOG_LEVEL || 'info' // eslint-disable-line no-undef
});

module.exports = {
    logger: () => { return logger; }
};