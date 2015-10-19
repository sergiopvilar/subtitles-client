import Extractor from '../lib/extractor.js'
import q from 'q'
let that;

class LegendasTVExtractor extends Extractor {

  constructor() {
    super();
    this.found = [];
    this.serieCounter = 0;
    this.baseURL = 'http://legendas.tv/';
    that = this;
  }

  extract(series, index) {
    this.series = series;
    return this.processSerie(series[index]);
  }

  processSerie(item) {
    return that.getPageContents('busca/'+item.name)
    .then(that.parseContent)
    .then(function() {
      return that.found;
    })
    .catch(error =>{
      console.log(error);
    });
  }

  processSeason(serieid) {
    return that.getPageContents('legenda/busca/-/1/-/0/'+serieid, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(_data => {
      const $ = _data[0];
      $('.f_left').each(function(i, el){
        var link = $(this).find('p').eq(0);
        that.found.push({
          text: link.text(),
          url: link.find('a').attr('href')
        });
      });
      return true;
    });

  }

  parseContent(data) {
    let [$, serieName] = data;
    serieName = serieName.replace('busca/','');
    let seasons = [];
    $('.slider_wrapper .item:contains("'+serieName+'") a').each(function(i, item) {
      seasons.push($(this).attr('data-filme'));
    });
    return q.all(seasons.map(that.processSeason))
  }

}

export default LegendasTVExtractor
