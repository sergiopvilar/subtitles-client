import * as Extractor from './extractor/';
import Serie from './model/Serie.js'

module.exports = function (serie_id, callback) {

  const ser = Serie.find({id: serie_id});
  Object.keys(Extractor).forEach(item => {
    let ex = Extractor[item];
    new ex().extract(ser).then(found => {
      callback(found);
    }).catch(error => {
      console.log(error);
    });
  });
};
