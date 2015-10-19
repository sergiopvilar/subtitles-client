import cheerio from 'cheerio'
import Q from 'q'
import HTTP from 'q-io/http'

class Extractor {

  extract() {
    throw new Error('Method not implemented!');
  }

  getPageContents(serieName, options) {
    if(!options) {
      options = {};
    }
    options.url = this.baseURL + serieName;
    options.method = 'GET';

    return HTTP.read(options).then(function(response){
       return [cheerio.load(response.toString()), serieName];
     });
  }

  parseContent() {
    throw new Error('Method not implemented!');
  }

}

export default Extractor
