const Podcast = require('podcast');
const moment = require('moment');

class ServicePodcast {
 
  /* lets create an rss feed */
  criaFeed (programa) {
   const feed = new Podcast({  
      title: programa.titulo,
      description: programa.resumo,
      feed_url: programa.link,
      site_url: programa.link,
      image_url: programa.imagens[0].url,
//      docs: 'http://example.com/rss/docs.html',
//      author: 'Dylan Greene',
//      managingEditor: 'Dylan Greene',
//      webMaster: 'Dylan Greene',
      copyright: '2019 Câmara dos Deputados',
      language: 'pt',
      categories: ['Category 1','Category 2','Category 3'],
      pubDate: moment(programa.data_formatada+' '+programa.hora_formatada, 'DD/MM/YYYY HH:mm'),
      ttl: '60',
      itunesAuthor: 'Rádio Câmara',
//      itunesSubtitle: 'I am a sub title',
      itunesSummary: programa.resumo,
      itunesOwner: { name: 'Rádio Câmara', email:'radiocamara@camara.leg.br' },
      itunesExplicit: false,      
      itunesCategory: [{text: 'Arts'}],
      itunesImage: programa.imagens[0].url
  });
   
  /* loop over data and add to feed */
  for (let i=0;i<programa.ultimas.length;i++)   {
    let edicao = programa.ultimas[i];

    //verifica se existe audio associado 
    if (edicao.audios.length>0) {
      console.log('### AUDIOS ###');
      console.log(edicao.audios);

      feed.addItem({
          title:  edicao.titulo,
          description: edicao.resumo,
          url: edicao.link, // link to the item
  //        guid: '1123', // optional - defaults to url
          categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories
  //        author: 'Guest Author', // optional - defaults to feed author property
          date: moment(edicao.data, 'YYYY-MM-DD HH:mm:ss'), // any format that js Date can parse.
  //        lat: 33.417974, //optional latitude field for GeoRSS
  //        long: -111.933231, //optional longitude field for GeoRSS
          enclosure : {url:edicao.audios[0].url}, // optional enclosure
//          itunesAuthor: 'Max Nowack',
          itunesExplicit: false
//          itunesSubtitle: 'I am a sub title',
//          itunesSummary: 'I am a summary',
//          itunesDuration: 12345,
//          itunesKeywords: ['javascript','podcast']
      });

  }
   
  }  
  // cache the xml to send to clients
  const xml = feed.buildXml();

  return xml;

  }

}
module.exports = ServicePodcast;