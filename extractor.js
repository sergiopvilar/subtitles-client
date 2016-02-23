require('./compile/src/index.js')(process.argv[2], function(found) {
  console.log(found);
});
