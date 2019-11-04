var helmet = require('helmet');
// https://github.com/helmetjs/helmet
class ConfigHelmet {
    config (app) {
        app.use(helmet());
    }
}

module.exports = new ConfigHelmet();