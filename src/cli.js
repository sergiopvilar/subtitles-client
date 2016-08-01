import op from './browser/extractor/opensubtitles.js'
import Serie from './browser/model/Serie.js'

let s = Serie.filter({name: 'Vikings'})[0];

new op().extract(s).then(found => {
  console.log('Found:');
  console.log(found);
}).catch(error => {
  console.log(error);
})
