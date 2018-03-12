## kwc-lineclip
A small javascript lib for clipping polylines by a bounding box.

### API
```js
lineclip(
    [[-10, 10], [10, 10], [10, -10]], // polyline
    [0, 0, 20, 20]); // bbox
// returns [[[0, 10], [10, 10], [10, 0]]]
```

### Algorithm
This library is an implementation of the approach described in ['An Efficient Algorithm for Line Clipping in Computer Graphics Programming'](http://www.academia.edu/2491960/An_Efficient_Algorithm_for_Line_Clipping_in_Computer_Graphics_Programming) by Kodituwakka, Wijeweera & Chamikara. Some adjustments have been made to the algorithm in the paper to cater for lines with multiple segments.

### Performance
I've checked the performance of this algorithm against implementations of the [Cohen-Sutherland](https://github.com/mapbox/lineclip) and a [Liang-barsky](https://github.com/w8r/liang-barsky) algorithms for clipping just one segment. Liang-barsky currently only supports a single segment clip.
````
SINGLE SEGMENT TEST
kwc x 9,542,273 ops/sec ±1.78% (100 runs sampled)
liang-barsky (non-destructive) x 17,583,416 ops/sec ±2.89% (99 runs sampled)
mapbox/lineclip x 7,022,569 ops/sec ±8.14% (95 runs sampled)
- Fastest is liang-barsky (non-destructive)

MULTIPLE SEGMENT MULTIPLE OUTPUT TEST
kwc x 4,974,886 ops/sec ±6.84% (82 runs sampled)
mapbox/lineclip x 3,788,980 ops/sec ±0.70% (88 runs sampled)
- Fastest is kwc

LONGER LINE
kwc x 800,189 ops/sec ±0.79% (93 runs sampled)
mapbox/lineclip x 704,052 ops/sec ±2.53% (88 runs sampled)
- Fastest is kwc
````

kwc-lineclip was initially faster than liang-barsky until I amended the algorithm to support multiple segments.

Memory usage is also slightly less in with this module compared with `lineclip`.
