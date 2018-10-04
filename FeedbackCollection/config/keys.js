if (process.env.NODE_ENV === 'production') {
    // return production keys
    module.exports = require('./prod');
} else {
    // return test keys
    module.exports = require('./dev');
}