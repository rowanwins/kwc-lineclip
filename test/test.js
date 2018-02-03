var test = require('tape')
var kwc = require('../dist/kwc-lineclip')

const bbox = [-5, -5, 5, 5]
let a = [-10, -10], b = [2.5, -2.5], c = [10, 10]

test('1 segment', t => {

  var out = kwc([a, c], bbox)

  t.equal(out[0][0][0], -5)
  t.equal(out[0][0][1], -5)
  t.equal(out[0][1][0], 5)
  t.equal(out[0][1][1], 5)

  // Check that inputs isn't modified
  t.equal(a[0], -10)
  t.equal(a[1], -10)
  t.equal(c[0], 10)
  t.equal(c[1], 10)

  t.end()
})

test('2 segments', t => {

  var out = kwc([a, b, c], bbox)

  t.equal(out[0][0][0], -1.6666666666666667)
  t.equal(out[0][0][1], -5)
  t.equal(out[0][1][0], 2.5)
  t.equal(out[0][1][1], -2.5)
  t.equal(out[0][2][0], 5)
  t.equal(out[0][2][1], 1.666666666666667)

  t.end()
})

test('2 segments In & Out', t => {

  var out = kwc([[-5, 10], [0, -10], [5, 10]], bbox)

  t.equal(out[0][0][0], -3.75)
  t.equal(out[0][0][1], 5)
  t.equal(out[0][1][0], -1.25)
  t.equal(out[0][1][1], -5)

  t.equal(out[1][0][0], 1.25)
  t.equal(out[1][0][1], -5)
  t.equal(out[1][1][0], 3.75)
  t.equal(out[1][1][1], 5)

  t.end()
})

test('Vertical segment', t => {

  var out = kwc([[1, 1], [1, 10]], bbox)
  t.equal(out[0][0][0], 1)
  t.equal(out[0][0][1], 1)
  t.equal(out[0][1][0], 1)
  t.equal(out[0][1][1], 5)

  t.end()
})

test('Vertical segment in longer line', t => {

  var out = kwc([[1, 1], [1, 10], [2, 1]], bbox)
  t.equal(out[0][0][0], 1)
  t.equal(out[0][0][1], 1)
  t.equal(out[0][1][0], 1)
  t.equal(out[0][1][1], 5)

  t.equal(out[1][0][0], 1.5555555555555556)
  t.equal(out[1][0][1], 5)
  t.equal(out[1][1][0], 2)
  t.equal(out[1][1][1], 1)

  t.end()
})

test('Horizontal segment', t => {

  var out = kwc([[1, 1], [10, 1]], bbox)
  t.equal(out[0][0][0], 1)
  t.equal(out[0][0][1], 1)
  t.equal(out[0][1][0], 5)
  t.equal(out[0][1][1], 1)

  t.end()
})

test('Horizontal segment in longer line', t => {

  var out = kwc([[10, 2], [1, 1], [10, 1]], bbox)
  t.equal(out[0][0][0], 5)
  t.equal(out[0][0][1], 1.4444444444444444)
  t.equal(out[0][1][0], 1)
  t.equal(out[0][1][1], 1)
  t.equal(out[0][2][0], 5)
  t.equal(out[0][2][1], 1)

  t.end()
})

test('Completely outside', t => {

  var out = kwc([[20, 20], [40, 40]], bbox)
  t.deepEqual(out, [])
  t.end()
})
