const profile = require('../profile/profiles').profile();
const redis = require('redis');
const cache = redis.createClient(profile.redis);
const {promisify} = require('util');
const getAsync = promisify(cache.get).bind(cache);
const delCacheAsync = promisify(cache.del).bind(cache);
const winston = require('../logger/winston');
const empty = require('is-empty');
const md5 = require('md5');

let redisRodando = false;
cache.on('error', () => {
    redisRodando = false;
    winston.error('Não foi possível conectar - Redis...');
});
cache.on('ready', () => {
    redisRodando = true;
    winston.info('Redis conectado com sucesso');
});
class ConfigCache {

    /**
     * 
     * @param {*} key 
     * @param {*} time - minutes
     * @param {*} callback 
     */
    async get(args, time, callback) {
        const key = this._generateKey(args);
        if(!redisRodando){
            return callback();
        }
        let obj = await getAsync(key);
        if (empty(obj)) {
            this._logInfo('Criando Cache', key);
            obj = await callback();
            if (!empty(obj)) {
                obj = JSON.stringify(obj);
                cache.set(key, obj, 'EX', time * 60);
            }
        } else {
            this._logInfo('Cache', key);
        }
        return !empty(obj) ? Promise.resolve(JSON.parse(obj)) : obj;
    }

    async del(args) {
        const key = this._generateKey(args);

        if(!redisRodando){
            this._logError('Não foi possível realizar o purge. Redis não está rodando', key);
            return Promise.reject('redis não está rodando');
        }       

        this._logInfo('Apagando cache: ',key);
        return delCacheAsync(key);
    }

    _logInfo(msg, key) {
        if (profile.ambiente !== 'production') {
            winston.info(msg + ' - ' + key);
        }
    }

    _logError(msg, key) {
        if (profile.ambiente !== 'production') {
            winston.error(msg + ' - ' + key);
        }
    }

    _generateKey(args) {
        if(!args.reduce) {
            winston.error('Para gerar a chave para o cache os argumentos devem ser um array');
        }
        const concatStr = args.reduce((prevVal, args) => {
            return prevVal + args;
        });
        let key = md5(concatStr);
        return key;
    }

}

module.exports = new ConfigCache();

