var Suite = require('benchmark').Suite
var kwc = require('./dist/kwc-lineclip')
var lb = require('liang-barsky')
var lineclip = require('lineclip')

const bbox = [-5, -5, 5, 5]
const a = [-10, -10];
const b = [10, 10];
const segment = [a, b];

console.log('SINGLE SEGMENT TEST')
new Suite('Single Segment')
  .add('kwc', () => {
    kwc(segment, bbox)
  })
  .add('liang-barsky (non-destructive)', () => {
    lb(a, b, bbox, [-10, -10], [10, 10])
  })
  .add('mapbox/lineclip', () => {
    lineclip(segment, bbox)
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

const line = [[-5, 10], [0, -10], [5, 10]];

function runNextSuite() {
  console.log('MULTIPLE SEGMENT MULTIPLE OUTPUT TEST')
  new Suite('Multiple Segments - Multiple Outputs')
    .add('kwc', () => {
      kwc(line, bbox)
    })
    .add('mapbox/lineclip', () => {
      lineclip(line, bbox)
    })
    .on('cycle', function (event) {
      console.log(event.target.toString())
    })
    .on('error', function (e) {
      throw e.target.error
    })
    .on('complete', function () {
      console.log('- Fastest is ' + this.filter('fastest').map('name') + '\n')
      runLongLineSuite()
    })
    .run({'async': true})
}

const line2 = [
  [-10, 10], [10, 10], [10, -10], [20, -10], [20, 10], [40, 10],
  [40, 20], [20, 20], [20, 40], [10, 40], [10, 20], [5, 20], [-10, 20]];

const bbox2 = [0, 0, 30, 30];

function runLongLineSuite() {
  console.log('LONGER LINE')
  new Suite('Longer line')
    .add('kwc', () => {
      kwc(line2, bbox2)
    })
    .add('mapbox/lineclip', () => {
      lineclip(line2, bbox2)
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
