let profiles = require('./profiles.json');
// Criar variavel de ambiente no servidor
// $ export NODE_ENV=producao | desenvolvimento | teste | homologacao
exports.profile = function(profile) {
  let node_env = '';
  if (profile) {
    node_env = profile;
  } else {
    node_env = process.env.NODE_ENV;
  }
  if(!node_env) {
    return profiles['desenvolvimento'];
  } else {
    switch (node_env) {
      case 'desenvolvimento':
      case 'teste':
      case 'homologacao':
      case 'production':
      return profiles[node_env];
      default:
      return profiles['desenvolvimento'];
    }
  }
};
