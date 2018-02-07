var test = require('tape')
var kwc = require('../dist/kwc-lineclip')
var lineclip = require('lineclip')

const bbox = [-5, -5, 5, 5]
let a = [-10, -10], b = [2.5, -2.5], c = [10, 10]

test('1 segment', t => {

  var out = kwc([a, c], bbox)
  t.deepEqual(out, [[[-5, -5], [5, 5]]])

  // Check that inputs isn't modified
  t.equal(a[0], -10)
  t.equal(a[1], -10)
  t.equal(c[0], 10)
  t.equal(c[1], 10)

  t.end()
})

test('2 segments', t => {
  var out = kwc([a, b, c], bbox)
  t.deepEqual(out, [[[-1.6666666666666667, -5], [2.5, -2.5], [5, 1.666666666666667]]])
  t.end()
})

test('2 segments In & Out', t => {
  var out = kwc([[-5, 10], [0, -10], [5, 10]], bbox)
  t.deepEqual(out, [[[-3.75, 5], [-1.25, -5]], [[1.25, -5], [3.75, 5]]])
  t.end()
})

test('Vertical segment heading north', t => {
  var out = kwc([[1, 1], [1, 10]], bbox)
  t.deepEqual(out, [[[1, 1], [1, 5]]])
  t.end()
})


test('Vertical segment heading south', t => {
  var out = kwc([[1, 1], [1, -10]], bbox)
  t.deepEqual(out, [[[1, 1], [1, -5]]])
  t.end()
})


test('Vertical segment in longer line', t => {
  var out = kwc([[1, 1], [1, 10], [2, 1]], bbox)
  t.deepEqual(out, [[[1, 1], [1, 5]], [[1.5555555555555556, 5], [2, 1]]])
  t.end()
})

test('Horizontal segment', t => {
  var out = kwc([[1, 1], [10, 1]], bbox)
  t.deepEqual(out, [[[1, 1], [5, 1]]])
  t.end()
})

test('Horizontal segment in longer line', t => {
  var out = kwc([[10, 2], [1, 1], [10, 1]], bbox)
  t.deepEqual(out, [[[5, 1.4444444444444444], [1, 1], [5, 1]]])
  t.end()
})

test('Horizontal segment in longer line - reversed', t => {
  var out = kwc([[10, 1], [1, 1], [10, 2]], bbox)
  t.deepEqual(out, [[[5, 1], [1, 1], [5, 1.4444444444444444]]])
  t.end()
})

test('Horizontal segment starting outside', t => {
  var out = kwc([[-10, 5], [2, 5]], bbox)
  t.deepEqual(out, [[[-5, 5], [2, 5]]])
  t.end()
})

test('Horizontal then vertical segment', t => {
  var out = kwc([[1, 1], [2, 1], [2, 10]], bbox)
  t.deepEqual(out, [[[1, 1], [2, 1], [2, 5]]])
  t.end()
})

test('Horizontal then vertical segment', t => {
  var out = kwc([[1, 1], [2, 1], [2, -10]], bbox)
  t.deepEqual(out, [[[1, 1], [2, 1], [2, -5]]])
  t.end()
})

test('Completely outside', t => {
  var out = kwc([[20, 20], [40, 40]], bbox)
  t.deepEqual(out, [])
  t.end()
})

test('Completely outside - horizontal', t => {
  var out = kwc([[20, 20], [40, 20]], bbox)
  t.deepEqual(out, [])
  t.end()
})

test('Completely outside - vertical', t => {
  var out = kwc([[20, 20], [20, 40]], bbox)
  t.deepEqual(out, [])
  t.end()
})

test('Compare outputs to lineclip', t => {
  var line = [
    [-10, 10], [10, 10], [10, -10], [20, -10], [20, 10], [40, 10],
    [40, 20], [20, 20], [20, 40], [10, 40], [10, 20], [5, 20], [-10, 20]]
  var newBB = [0, 0, 30, 30]
  var lineOut = lineclip(line, newBB)
  var kwcOut = kwc(line, newBB)
  t.deepEqual(lineOut, kwcOut)
  t.end()
})
