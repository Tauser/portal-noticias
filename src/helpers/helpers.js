const handlebars = require('handlebars');
/*eslint-disable*/
const helpers = require('handlebars-helpers')({
  handlebars: handlebars
});

var paginate = require('handlebars-paginate');
handlebars.registerHelper('paginacao', paginate);

/*eslint-enable*/
const moment = require('moment');

handlebars.registerHelper('eachVejaTambem', function (context, options) {
  let ret = '';

  for (var i = 0; i < 4; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
});

handlebars.registerHelper('retornaQuantidadeComentarios', function (quantidadeComentarios, countComentariosSisnews) {
  return quantidadeComentarios + countComentariosSisnews;
});

handlebars.registerHelper('urlImagemAssociada', function (imagens){
  if (imagens===undefined || imagens.length==0)  {
    return '';
  }

  let imagem = imagens[0];

  for (var i = 0; i < imagem.sizes.length; i++) {
    let size = imagem.sizes[i];

    // verifica se o wordpress criou uma versão de tamanho medium_large 
    if (size.tipo == 'medium_large') {
      return size.url;
    }
  }

  // se não há imagens redimensiondas de tamanho adequado, entao retorna a imagem original
  return imagem.url;
});

handlebars.registerHelper('concat', function (sigla, numero, ano) {
  return 'Sua opinião sobre ' + sigla + ' ' + numero + '/' + ano;
});

handlebars.registerHelper('parseJson', function (data, options) {
  let json = null;
  try {
    json = options.fn(JSON.parse(data));
  } catch (e) {
    return null;
  }
  return json;
});

handlebars.registerHelper('retornaDataHoraUltimasNoticias', function (dataHora) {
  const data = moment(dataHora).format('DD/MM');
  const hora = moment(dataHora).format('HH:mm').replace(':', 'h');
  const dtHora = `<span class="ultimas-noticias__data">${data} </span><span class="ultimas-noticias__hora">${hora} </span>`;
  const dataAtual = moment().format('DD/MM');
  return dataAtual === data.trim() ? hora : dtHora;
});

handlebars.registerHelper('retornarDataHoraFormatada', function (dataHora) {
  const data = moment(dataHora).format('DD/MM/YYYY');
  const hora = moment(dataHora).format('HH:mm').replace(':', 'h');
  const dtHora = data + ', ' + hora;
  const dataAtual = moment().format('DD/MM/YYYY');
  return dataAtual === data.trim() ? hora : dtHora;
});

handlebars.registerHelper('formataHora', function (hora) {
  const horaFormatada = hora.replace(':', 'h');
  return horaFormatada;
});

handlebars.registerHelper('retornaIdProposicao', function (IdProposicao) {
  return IdProposicao[0];
});

handlebars.registerHelper('incremented', function (index) {
  index++;
  return index;
});

handlebars.registerHelper('retornaBuscaAvancada', function (currentPage) {
  if (parseInt(currentPage) >= 10) {
    return true;
  }
});

handlebars.registerHelper('desabilitaAnterior', function (currentPage) {
  if (parseInt(currentPage) >= '2') {
    return '';
  } else {
    return 'disabled';
  }
});

handlebars.registerHelper('desabilitaProxima', function (currentPage, totalItens) {
  if (totalItens === 10) {
    return '';
  } else {
    return 'disabled';
  }
});

handlebars.registerHelper('mostraPaginaAnterior', function (currentPage) {
  return parseInt(currentPage) - 1;
});

handlebars.registerHelper('mostraProximaPagina', function (currentPage, totalItens) {
  if (totalItens === 10) {
    totalItens = parseInt(currentPage) + 1;
  } else {
    totalItens = currentPage;
  }
  return totalItens;
});

handlebars.registerHelper('pagination', function (currentPage, totalPage, size, options) {
  //console.log('current: ', currentPage + ' - totalPage: ', totalPage+ ' - size: ', size );
  if (totalPage === 10) {
    totalPage = parseInt(currentPage) + 1;
  } else {
    totalPage = currentPage;
  }

  var startPage, endPage, context;

  if (arguments.length === 3) {
    options = size;
    size = 5;
  }

  startPage = currentPage - Math.floor(size / 2);
  endPage = currentPage + Math.floor(size / 2);

  if (startPage <= 0) {
    endPage -= (startPage - 1);
    startPage = 1;
  }

  if (endPage > totalPage) {
    endPage = totalPage;
    if (endPage - size + 1 > 0) {
      startPage = endPage - size + 1;
    } else {
      startPage = 1;
    }
  }

  context = {
    startFromFirstPage: true,
    pages: [],
    endAtLastPage: true,
  };
  if (startPage === 1) {
    context.startFromFirstPage = true;
  }
  for (var i = startPage; i <= endPage; i++) {
    context.pages.push({
      page: i,
      isCurrent: i === currentPage,
    });
  }
  if (endPage === totalPage) {
    context.endAtLastPage = true;
  }

  return options.fn(context);
});

handlebars.registerHelper('carregarProximas', function (currentPage) {
  return parseInt(currentPage) + 1;
});

handlebars.registerHelper('retornaTotalDeAudios', function (audios, totalAudios) {
  if (totalAudios === 1) {
    return '';
  } else if (totalAudios > 0) {
    return '(' + parseInt(audios + 1) + ') ';
  }
});

handlebars.registerHelper('retornaActive', function (currentPage, page) {
  if (page === parseInt(currentPage)) {
    return 'active';
  }
});

handlebars.registerHelper('replaceData', function (data) {
  if (data !== undefined) {
    return data.replace(/\//g, '%2F');
  }
});

handlebars.registerHelper('toJSON', function (object) {
  return new handlebars.SafeString(JSON.stringify(object));
});

handlebars.registerHelper('breaklines', function(text) {
  text = handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new handlebars.SafeString(text);
});