class MidiasController {

  constructor(serviceCMSMidias) {
    this.serviceCMSMidias = serviceCMSMidias;
  }

  obter_midia(req, res) {
    this.serviceCMSMidias.obterMidia(req.url, res);
  }

}

module.exports = MidiasController;