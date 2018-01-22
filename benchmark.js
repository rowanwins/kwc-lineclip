var Suite = require('benchmark').Suite;
var kwc = require('./dist/kwc-lineclip');
var lb = require('liang-barsky');
var lineclip = require('lineclip');

const bbox = [-5, -5, 5, 5];

new Suite()
  .add('kwc', () => {
    var a = [-10, -10], b = [10, 10]
    kwc([a, b], bbox);
  })
  .add('liang-barsky', () => {
    var a = [-10, -10], b = [10, 10]
    lb(a, b, bbox);
  })
  .add('mapbox/lineclip', () => {
    var a = [-10, -10], b = [10, 10]
    lineclip([a, b], bbox);
  })
  .on('cycle', function(event) {
    console.log(event.target.toString());
  })
  .on('error', function(e) {
    throw e.target.error;
  })
  .on('complete', function() {
    console.log('- Fastest is ' + this.filter('fastest').map('name') + '\n');
  })
  .run({ 'async': true });