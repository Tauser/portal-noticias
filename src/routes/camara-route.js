const express = require('express');
// const profile = require('../config/profile/profiles').profile();
const router = express.Router();
const profile = require('../config/profile/profiles').profile();

const loginCidadaoExpress = require('login-cidadao-cliente-express');
const ClienteLoginCidadao = loginCidadaoExpress.ClienteLoginCidadao;
const middlewaresLoginCidadao = loginCidadaoExpress.middlewareExpress;

//configura clienteLoginCidadao, conforme último exemplo acima
const clienteLoginCidadao = new ClienteLoginCidadao({
	clientId: 'portal-institucional',
	clientSecret: process.env.SECRET_LOGIN_CIDADAO || profile.secretLoginCidadao,
	clientUri: profile.clientUri,
	loginCidadaoUri: profile.urlLoginCidadao
});

//cria o middleware que autentica rotas
const autenticador = middlewaresLoginCidadao.autenticadorDeRotas(clienteLoginCidadao);

module.exports = (
	noticiasController,
	radioController,
	tvController,
	boletinsController,
	assessoriaImprensaController,
	rssController,
	midiasController,
	legadoController,
	podcastController,
	confereController
) => {
	/**
  * Midias
  */
	router.get('/midias/*', midiasController.obter_midia.bind(midiasController));

	/**
  * Home de noticias
  */
	router.get('/noticias', noticiasController.visualizarHomeNoticias.bind(noticiasController));

	/**
	 * Home Confere
	 * */
	router.get('/confere', confereController.visualizarHomeConfere.bind(confereController));

	/**
  * RedirectSisnews
  */
	router.get('/redirect-sisnews/:idsisnews', legadoController.redirecionaParaNovoSite.bind(legadoController));

	/**
  * Página de assinatura de rss de notícias
  */
	router.get('/noticias/rss', rssController.visualizarPaginaAssinaturaRSS.bind(rssController));

	/**
  * Página rss de útlimas notícias
  */
	router.get('/noticias/rss/ultimas-noticias', rssController.visualiarUltimasNoticiasRSS.bind(rssController));

	/**
  * Página de envio opinião ao deputados
  */

	router.get(
		'/noticias/opiniao-deputados',
		autenticador,
		noticiasController.carregaModalOpiniaoDeputados.bind(noticiasController)
	);

	router.get('/:urlNoticia/:idNoticia/opiniao-deputados', autenticador, (req, res) => {
		const urlNoticia = req.path.replace('/opiniao-deputados', '');
		if (req.estaAutenticado()) {
			noticiasController.enviaOpiniaoDeputados.bind(noticiasController);
			res.redirect(urlNoticia);
		} else {
			res.redirect(urlNoticia);
		}
	});

	router.post(
		'/noticias/opiniao-deputados',
		autenticador,
		noticiasController.enviaOpiniaoDeputados.bind(noticiasController)
	);

  /**
  * Página rss por tema
  */
	router.get('/noticias/rss/dinamico/:tema', rssController.visualiarRssPorTema.bind(rssController));

  /**
  * Podcasts por programa
  */
  router.get('/radio/podcasts/:programa', podcastController.podcastPorPrograma.bind(podcastController));

	/**
  * url de ultimas da radioagencia
  */
	router.get('/radio/radioagencia', noticiasController.visualizarUltimas.bind(noticiasController));

	/**
  * Home radio camara
  */
	router.get('/radio', radioController.visualizarHomeRadioCamara.bind(radioController));

	/**
   * Programação Semanal Rádio Camara
   */
	router.get('/radio/programacao', radioController.vizulizarProgramacaoRadioCamara.bind(radioController));

	/**
   *  Programas radio por categoria
   */
	router.get(
		'/radio/programa/:categoria',
		radioController.visualizarProgramasRadioCamaraCategoria.bind(radioController)
	);

	/**
   * Categoras Programas Rádio camara
   */
	router.get('/radio/programas', radioController.visualizarProgramasRadioCamara.bind(radioController));

	/**
  * Programação tv camara
  */
	router.get('/tv/programacao-semanal', tvController.visualizarProgramacaoTvCamara.bind(tvController));

	/**
   * Programas Documentários tv camara
   */
	router.get('/tv/programa/documentarios', tvController.visualizarEdiçõesDeProgramaPorCategoria.bind(tvController));

	/**
   * Programas tv camara
   */
	router.get('/tv/programa/:categoria', tvController.vizualizarProgramasTvCamaraCategotia.bind(tvController));

	/**
   * Categoras Programas tv camara
   */
	router.get('/tv/programas', tvController.visualizarProgramasTvCamara.bind(tvController));

	/**
   * Home tv camara
   */
	router.get('/tv', tvController.visualizarHomeTvCamara.bind(tvController));

	/**
   * Assessoria de imprensa
   */
	router.get(
		'/assessoria-de-imprensa',
		assessoriaImprensaController.visualizarHomeAssessoriaImprensa.bind(assessoriaImprensaController)
	);

	/**
   *  Boletins
   */
	router.get('/boletins', boletinsController.visualizarBoletins.bind(boletinsController));

	/**
   *  Boletins por data
   */
	router.get('/boletins/:data', boletinsController.visualizarBoletins.bind(boletinsController));

	/**
   * url de tags...
   * ex.: path/noticias/ultimas/tags?tag=ecoturismo
   */
	router.get('/noticias/ultimas/tags', noticiasController.visualizarTags.bind(noticiasController));

	/**
   * url genérica para noticias, radio, tv...
   * ex.: path/noticias/ultimas/1
   */
	router.get(/(ultimas)+/, noticiasController.visualizarUltimas.bind(noticiasController));

	/**
   * rota para comentarios anteriores do sisNews.
   * /noticias/comentarios/2556-seminario-no-parana-debate-o-fim-do-foro-privilegiado
   */
	router.get(
		'/:urlNoticia/:idNoticia/comentarios',
		noticiasController.visualizarComentariosPorId.bind(noticiasController)
	);

	/**
   * rota para o formato de url - /comunicacao/agencia-camara/administracao-publica/379-maia-quer-concluir-votacao-do-cadastro-positivo-e-avancar-com-pauta-microeconomica
   */
	router.get(/[0-9]*[0-9](-[A-z]+)+/, noticiasController.visualizarNoticiasPorId.bind(noticiasController));

	/**
	 * purge do cache 
	 */
	router.purge(/[0-9]*[0-9](-[A-z]+)+/, noticiasController.purgeNoticiasPorId.bind(noticiasController));

	/**
   * Visualiza home noticias.
   * Metodo somente para visualizacao da noticia pelo software CMS durante a edicao da home.
   */
	router.post('/visualiza-home-noticias', noticiasController.visualizarHomeNoticias.bind(noticiasController));

	/**
  * Visualiza home radio.
  * Metodo somente para visualizacao da radio pelo software CMS durante a edicao da home.
  */
	router.post('/visualiza-home-radio', radioController.visualizarHomeRadioCamara.bind(radioController));

	/**
   * Visualiza home radio.
   * Metodo somente para visualizacao da radio pelo software CMS durante a edicao da home.
   */
	router.post('/visualiza-home-tv', tvController.visualizarHomeTvCamara.bind(tvController));

	/**
  * Visualiza home assessoria de imprensa.
  * Metodo somente para visualizacao da radio pelo software CMS durante a edicao da home.
  */
	router.post(
		'/visualiza-home-assessoria-de-imprensa',
		assessoriaImprensaController.visualizarHomeAssessoriaImprensa.bind(assessoriaImprensaController)
	);

	/**
   * rota para paginas estaticas (CMS)
   * Ex:
   * /conteudo/agencia/expediente
   * /conteudo/tv/expediente
   */
	/*eslint-disable*/
	router.get(
		/(conteudo\/)+([^\?])+([^\?])(\?.*)?/,
		noticiasController.visualizarPaginasEstativas.bind(noticiasController)
	);

	/*eslint-enable*/
	// if(profile.ambiente !== 'production') {
	router.post('/visualiza/*', noticiasController.visualizar.bind(noticiasController));
	// }
	return router;
};
