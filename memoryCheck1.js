var kwc = require('./dist/kwc-lineclip')

kwc([
  [-10, 10], [10, 10], [10, -10], [20, -10], [20, 10], [40, 10],
  [40, 20], [20, 20], [20, 40], [10, 40], [10, 20], [5, 20], [-10, 20]],
[0, 0, 30, 30])

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`KWC uses approximately ${Math.round(used * 100) / 100} MB`);