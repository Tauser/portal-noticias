jest.mock('../../src/config/request/request.js');
const request = require('../../src/config/request/request.js');

class MockRequestPromise {
    async get (retorno) {
        request.get.mockResolvedValue(retorno);
    }
}

module.exports = new MockRequestPromise();