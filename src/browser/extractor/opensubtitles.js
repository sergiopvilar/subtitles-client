import Extractor from './extractor.js'
import OP from 'subtitler'
import q from 'q'
let that;

class OpenSubtitlesExtractor extends Extractor {

  constructor() {
    super();
    this.lang = 'pob'
    that = this;
  }

  extract(serie) {
    this.serie = serie;
    return OP.api.login()
    .then(that.searchForTitle)
    .then(that.processTitles)
    .then(function(found) {
      return {
        serie_id: that.serie.id,
        subtitles: found
      };
    })
    .catch(error =>{
      console.log(error);
    });
  }

  searchForTitle(token) {
    that.token = token;
    const query = that.serie.name
    return OP.api.search(that.token, that.lang, {
      query: query
    })
  }

  processTitles(results) {
    let valids = [];
    results.forEach(item => {
      const withSpace = that.serie.name + ' S'+that.serie.season
      const withoutSpace = withSpace.replace(/ /g, '.')
      if(item.SubFileName.indexOf(withSpace) > -1 || item.SubFileName.indexOf(withoutSpace) > -1)
        valids.push({
          text: item.SubFileName.replace('.srt', ''),
          url: item.ZipDownloadLink,
          source: 'OpenSubtitles'
        });
    });
    return valids;
  }

}

export default OpenSubtitlesExtractor
