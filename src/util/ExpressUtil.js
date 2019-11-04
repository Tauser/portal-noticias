class ExpressUtil {
    error (error, res, next) {
        res.sendStatus(error.status || 500);
        next();
    }
}
module.exports = new ExpressUtil();