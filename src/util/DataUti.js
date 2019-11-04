const moment = require('moment');
module.exports = class DataUtil {
    static converterToString(longTime, format, utcOffset) {
       return utcOffset ? moment(longTime).utcOffset(utcOffset).format(format) : moment(longTime).format(format);
    }
};