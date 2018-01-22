var test = require('tape');
var kwc = require('../dist/kwc-lineclip');

test('kwc-lineclip', t => {
    const bbox = [-5, -5, 5, 5];
    let a = [-10, -10], b = [10, 10]
    var out = kwc([a, b], bbox);
    t.equal(a[0], -5)
    t.equal(a[1], -5)
    t.equal(b[0], 5)
    t.equal(b[1], 5)

    t.end();
});
