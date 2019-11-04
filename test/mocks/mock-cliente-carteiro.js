class ClienteCarteiro {
  constructor() {
    this.ultimaMensagemEnviada = null;
  }

  enviarMensagem(mensagem) {
    this.ultimaMensagemEnviada = mensagem;
    return new Promise((resolve) => {
      resolve();
    });
  }
}

module.exports = ClienteCarteiro;
