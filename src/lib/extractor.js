import cheerio from 'cheerio'
import Q from 'q'
import HTTP from 'q-io/http'

class Extractor {

  extract() {
    throw new Error('Method not implemented!');
  }

  getPageContents(serieName, options) {
    var lower = (options === true) ? true : false;
    if(!options || options === true)
      options = {};
    options.url = this.baseURL + serieName;
    options.method = 'GET';
    return HTTP.read(options).then(function(response){
      var res = (lower) ? response.toString().toLowerCase() : response.toString();
      return [cheerio.load(res), serieName];
     });
  }

  parseContent() {
    throw new Error('Method not implemented!');
  }

}

export default Extractor
