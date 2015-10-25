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
    this.series = series
    this.serie = series[index]
    return this.processSerie(series[index]);
  }

  getSeason() {
    var s = parseInt(that.serie.season);
    if(s == 0) return '';
    return (s < 10) ? 'S0'+s : 'S'+s;
  }

  processSerie(item) {
    return that.getPageContents('busca/'+item.name, true)
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
      var season = that.getSeason();
      $('.f_left').each(function(i, el){
        var link = $(this).find('p').eq(0);
        var href = link.find('a').attr('href').split('download/')[1].split('/');
        if(link.text().indexOf(season) > -1)
        that.found.push({
          text: link.text(),
          url: 'http://legendas.tv/downloadarquivo/'+href[0]
        });
      });
      return true;
    });

  }

  parseContent(data) {
    let [$, serieName] = data;
    serieName = serieName.replace('busca/','');
    let seasons = [];
    $('.slider_wrapper .item:contains("'+serieName.toLowerCase()+'") a').each(function(i, item) {
      seasons.push($(this).attr('data-filme'));
    });
    return q.all(seasons.map(that.processSeason))
  }

}

export default LegendasTVExtractor
