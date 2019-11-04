const profile = require('../profile/profiles').profile();
const ClienteCarteiro = require('carteiro-cliente').ClienteCarteiro;

class ConfigCarteiro {
  constructor() {
    this.clienteCarteiro = new ClienteCarteiro({
      urlCarteiro: profile.urlCarteiro,
      clientId: 'novo-portal',
      clientSecret: process.env.SECRET_CARTEIRO || profile.secretCarteiro
    });
  }
}

module.exports = ConfigCarteiro;