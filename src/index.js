import data from '../data.json'
import * as Extractor from './extractor/'

module.exports = function(index, callback) {

  Object.keys(Extractor).forEach(item => {
    let ex = Extractor[item];
    new ex().extract(data.series, index).then(found => {
      callback(found);
    }).catch(error => {
      console.log(error);
    })
  });

};
