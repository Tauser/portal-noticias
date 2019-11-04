let request = require('request-promise-native');
    
const requestConfigurado = request.defaults ({
    timeout: 30000,
    json: true
});

module.exports = requestConfigurado;