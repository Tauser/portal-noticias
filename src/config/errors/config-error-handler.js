var winston = require('../logger/winston');

class ConfigErrorHandler {
  config(app) {
    app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    /*eslint-disable */
    app.use((err, req, res, next) => {
    /*eslint-enable */
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'desenvolvimento' ? err : {};

      winston.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
          req.method
        } - ${req.ip}`
      );

      res.status(err.status || 500);
      next();
    });
  }
}
module.exports = new ConfigErrorHandler();
