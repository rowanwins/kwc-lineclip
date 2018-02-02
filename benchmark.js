var Suite = require('benchmark').Suite
var kwc = require('./dist/kwc-lineclip')
var lb = require('liang-barsky')
var lineclip = require('lineclip')

const bbox = [-5, -5, 5, 5]

console.log('SINGLE SEGMENT TEST')
new Suite('Single Segment')
  .add('kwc', () => {
    var a = [-10, -10], b = [10, 10]
    kwc([a, b], bbox)
  })
  .add('liang-barsky (non-destructive)', () => {
    var a = [-10, -10], b = [10, 10]
    var an = a.slice(), bn = b.slice()
    lb(a, b, bbox, an, bn)
  })
  .add('mapbox/lineclip', () => {
    var a = [-10, -10], b = [10, 10]
    lineclip([a, b], bbox)
  })
  .on('cycle', function (event) {
    console.log(event.target.toString())
  })
  .on('error', function (e) {
    throw e.target.error
  })
  .on('complete', function () {
    console.log('- Fastest is ' + this.filter('fastest').map('name') + '\n')
    runNextSuite()
  })
  .run({'async': true})


function runNextSuite() {
  console.log('MULTIPLE SEGMENT MULTIPLE OUTPUT TEST')
  new Suite('Multiple Segments - Multiple Outputs')
    .add('kwc', () => {
      kwc([[-5, 10], [0, -10], [5, 10]], bbox)
    })
    .add('mapbox/lineclip', () => {
      lineclip([[-5, 10], [0, -10], [5, 10]], bbox)
    })
    .on('cycle', function (event) {
      console.log(event.target.toString())
    })
    .on('error', function (e) {
      throw e.target.error
    })
    .on('complete', function () {
      console.log('- Fastest is ' + this.filter('fastest').map('name') + '\n')
    })
    .run({'async': true})
}
